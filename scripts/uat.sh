#!/usr/bin/env bash
# UAT battery for vigimed-www proxy locale routing.
#
# Usage:
#   BASE=https://your-preview.vercel.app BYPASS=<secret> ./scripts/uat.sh
#   BASE=http://localhost:3000 ./scripts/uat.sh
#
# Env vars:
#   BASE    Base URL of the target deployment. Defaults to http://localhost:3000.
#   BYPASS  Optional Vercel protection bypass secret. When set, sent as
#           x-vercel-protection-bypass on every request.

set -u

: "${BASE:=http://localhost:3000}"
BYPASS="${BYPASS:-}"

CURL_HEADERS=()
if [[ -n "$BYPASS" ]]; then
  CURL_HEADERS+=(-H "x-vercel-protection-bypass: $BYPASS")
fi

pass=0
fail=0

ok()   { printf "  \033[32m✓\033[0m %s\n" "$1"; pass=$((pass+1)); }
bad()  { printf "  \033[31m✗\033[0m %s\n" "$1"; fail=$((fail+1)); }

section() { printf "\n\033[1m%s\033[0m\n" "$1"; }

# Local pre-flight: runs regardless of curl target. The whole point of the
# gate is to block pushes with broken builds or lint findings before they
# reach either localhost or a preview. Fails fast; does not consume the
# curl pass/fail counters so the final "passed: N, failed: N" summary
# continues to report the 23-check contract.
section "Pre-flight (build + lint)"

if npm run build >/tmp/vm-uat-build.log 2>&1; then
  printf "  \033[32m✓\033[0m npm run build\n"
else
  printf "  \033[31m✗\033[0m npm run build (see /tmp/vm-uat-build.log)\n"
  tail -20 /tmp/vm-uat-build.log
  exit 1
fi

if npm run lint >/tmp/vm-uat-lint.log 2>&1; then
  printf "  \033[32m✓\033[0m npm run lint\n"
else
  printf "  \033[31m✗\033[0m npm run lint (see /tmp/vm-uat-lint.log)\n"
  tail -20 /tmp/vm-uat-lint.log
  exit 1
fi

# check_status <path> <expected_status> <description>
check_status() {
  local path="$1" expected="$2" desc="$3"
  local status
  status=$(curl -s -o /dev/null -w "%{http_code}" ${CURL_HEADERS[@]+"${CURL_HEADERS[@]}"} "$BASE$path")
  if [[ "$status" == "$expected" ]]; then
    ok "$desc  [$path]  $status"
  else
    bad "$desc  [$path]  expected $expected, got $status"
  fi
}

# check_redirect <path> <location_regex> <description>
check_redirect() {
  local path="$1" loc_re="$2" desc="$3"
  local response status location
  response=$(curl -sI ${CURL_HEADERS[@]+"${CURL_HEADERS[@]}"} "$BASE$path")
  status=$(printf "%s" "$response" | awk 'NR==1 {print $2}' | tr -d '\r')
  location=$(printf "%s" "$response" | awk 'tolower($1)=="location:" {print $2}' | tr -d '\r')
  if [[ ( "$status" == "308" || "$status" == "307" ) && "$location" =~ $loc_re ]]; then
    ok "$desc  [$path]  $status → $location"
  else
    bad "$desc  [$path]  expected 308/307 matching $loc_re, got $status $location"
  fi
}

# check_followed <path> <expected_final_status> <description>
check_followed() {
  local path="$1" expected="$2" desc="$3"
  local status
  status=$(curl -s -L -o /dev/null -w "%{http_code}" ${CURL_HEADERS[@]+"${CURL_HEADERS[@]}"} "$BASE$path")
  if [[ "$status" == "$expected" ]]; then
    ok "$desc  [$path]  final $status"
  else
    bad "$desc  [$path]  expected final $expected, got $status"
  fi
}

printf "UAT against: %s%s\n" "$BASE" "${BYPASS:+ (with bypass)}"

section "Root redirect"
check_redirect "/" '/(mx-es|us-en)$' "root → default locale"

section "Locale homes"
check_status "/mx-es" "200" "mx-es home"
check_status "/us-en" "200" "us-en home"

section "Matching localized slugs"
check_status "/mx-es/plataforma"   "200" "mx-es plataforma"
check_status "/us-en/platform"     "200" "us-en platform"
check_status "/mx-es/contacto"     "200" "mx-es contacto"
check_status "/us-en/contact"      "200" "us-en contact"
check_status "/mx-es/proximamente" "200" "mx-es proximamente"
check_status "/us-en/coming-soon"  "200" "us-en coming-soon"

section "Mismatched localized slugs (page-level notFound)"
check_status "/mx-es/platform"   "404" "mx-es with EN slug"
check_status "/us-en/plataforma" "404" "us-en with ES slug"
check_status "/mx-es/contact"    "404" "mx-es with EN contact"
check_status "/us-en/contacto"   "404" "us-en with ES contacto"

section "Invalid locale-shaped segments (proxy 404)"
check_status "/fr-fr" "404" "invalid locale fr-fr"
check_status "/de"    "404" "invalid locale de"

section "Non-locale paths preserve path, end in 404"
check_followed "/about"          "404" "/about preserved → 404"
check_followed "/blog/some-post" "404" "/blog/some-post preserved → 404"

section "Cookie persistence"

COOKIE_JAR=/tmp/vm-cookies.txt
rm -f "$COOKIE_JAR"

# Visit us-en, should set cookie
curl -s -o /dev/null -c "$COOKIE_JAR" ${CURL_HEADERS[@]+"${CURL_HEADERS[@]}"} "$BASE/us-en"
if grep -q "vm-locale.*us-en" "$COOKIE_JAR" 2>/dev/null; then
  ok "cookie set to us-en after /us-en visit"
else
  bad "cookie NOT set after /us-en visit"
fi

# Visit root with cookie, should redirect to /us-en (overrides any geolocation)
loc=$(curl -s -o /dev/null -w "%{redirect_url}" -b "$COOKIE_JAR" ${CURL_HEADERS[@]+"${CURL_HEADERS[@]}"} "$BASE/")
if [[ "$loc" == *"/us-en"* ]]; then
  ok "root redirects to /us-en when cookie=us-en  [$loc]"
else
  bad "root redirected to $loc (expected /us-en)"
fi

# Wipe cookies, visit root fresh — should fall back to geolocation default
rm -f "$COOKIE_JAR"
code=$(curl -s -o /dev/null -w "%{http_code}" ${CURL_HEADERS[@]+"${CURL_HEADERS[@]}"} "$BASE/")
if [[ "$code" == "308" ]]; then
  ok "fresh root (no cookie) returns 308 redirect"
else
  bad "fresh root returned $code (expected 308)"
fi

rm -f "$COOKIE_JAR"

section "SEO surfaces"

# /sitemap.xml returns 200 and includes both locale prefixes
sitemap_body=$(curl -s ${CURL_HEADERS[@]+"${CURL_HEADERS[@]}"} "$BASE/sitemap.xml")
sitemap_status=$(curl -s -o /dev/null -w "%{http_code}" ${CURL_HEADERS[@]+"${CURL_HEADERS[@]}"} "$BASE/sitemap.xml")
if [[ "$sitemap_status" == "200" ]] && printf "%s" "$sitemap_body" | grep -q "mx-es" && printf "%s" "$sitemap_body" | grep -q "us-en"; then
  ok "sitemap.xml 200 and contains both locales"
else
  bad "sitemap.xml expected 200 + mx-es + us-en, got status $sitemap_status"
fi

# /robots.txt returns 200 and mentions the sitemap
robots_body=$(curl -s ${CURL_HEADERS[@]+"${CURL_HEADERS[@]}"} "$BASE/robots.txt")
robots_status=$(curl -s -o /dev/null -w "%{http_code}" ${CURL_HEADERS[@]+"${CURL_HEADERS[@]}"} "$BASE/robots.txt")
if [[ "$robots_status" == "200" ]] && printf "%s" "$robots_body" | grep -qi "sitemap:"; then
  ok "robots.txt 200 and advertises Sitemap:"
else
  bad "robots.txt expected 200 + Sitemap: line, got status $robots_status"
fi

# /api/og?locale=us-en&page=home returns image/png
og_headers=$(curl -sI ${CURL_HEADERS[@]+"${CURL_HEADERS[@]}"} "$BASE/api/og?locale=us-en&page=home")
og_status=$(printf "%s" "$og_headers" | awk 'NR==1 {print $2}' | tr -d '\r')
og_ctype=$(printf "%s" "$og_headers" | awk 'tolower($1)=="content-type:" {print $2}' | tr -d '\r')
if [[ "$og_status" == "200" && "$og_ctype" == image/png* ]]; then
  ok "/api/og us-en home returns image/png  [$og_ctype]"
else
  bad "/api/og expected 200 + image/png, got status $og_status content-type $og_ctype"
fi

printf "\npassed: %d, failed: %d\n" "$pass" "$fail"
exit $(( fail > 0 ? 1 : 0 ))
