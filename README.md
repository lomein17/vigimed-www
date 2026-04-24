# vigimed-www

Marketing site for [vigimed.ai](https://vigimed.ai). Next.js (App Router), custom path-based i18n (`mx-es`, `us-en`), Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Dev server runs at http://localhost:3000. The root path redirects to `/us-en` by default; set the `vm-locale` cookie or visit `/mx-es` directly to see the Mexican locale.

## Deployment

- Hosted on Vercel as project `vigimed-www`.
- The `main` branch deploys to Production at `www.vigimed.ai` (public).
- The `main` branch also deploys to Staging at `staging.vigimed.ai` via a Vercel Custom Environment. Staging is gated behind Vercel Authentication.
- Feature branches receive auto-generated preview URLs.

## Repo layout

- `proxy.ts` — root request handler (locale detection and redirects). Next 16 renamed `middleware` to `proxy`; same functionality.
- `src/app/[locale]/` — locale-scoped routes. Pages enforce locale-slug pairing via `notFound()`.
- `src/content/{locale}/` — typed copy modules per section.
- `src/lib/i18n.ts` — single source of truth for locales, default locale, and per-locale config.

## Feature flags

### `SHOW_HOME`

Gates the post-repositioning Home (Hero + MX Capabilities) at `/{locale}/`. When the value is the literal string `"true"`, the locale root renders the new Home. Any other value (including unset) redirects to the chromeless ComingSoon (`/{locale}/coming-soon` for US, `/{locale}/proximamente` for MX).

Read server-side only. No `NEXT_PUBLIC_` prefix, so the value is not inlined into the client bundle and can be scoped per Vercel environment without a rebuild.

Vercel scoping:

| Environment | Value | Effect |
| --- | --- | --- |
| Production | `false` (or unset) | `www.vigimed.ai` redirects `/` to ComingSoon. |
| Staging | `true` | `staging.vigimed.ai` renders the new Home (behind Vercel Auth). |
| Development | `true` | New Home renders under `next dev`. |

**Release action:** flipping Production to `"true"` ships the new Home to `www.vigimed.ai`. Vercel does not auto-redeploy when env vars change, so after editing the Production value you must trigger a redeploy (push a commit, or use "Redeploy" on the latest Production deployment).

## Staging

`staging.vigimed.ai` is a durable pre-production surface backed by a Vercel Custom Environment on the `vigimed-www` project. It tracks the `main` branch and builds from the same trunk as Production, differentiated only by environment variables (notably `SHOW_HOME=true` on Staging, `false` or unset on Production).

Access is gated by Vercel Authentication: any user with project access on the Vercel team can view; leaked URLs return a login challenge. Production (`www.vigimed.ai`) remains publicly reachable.

Use Staging to UAT flag-gated features before flipping them on Production. Env var parity with Production is a deliberate discipline: when adding a new Production env var, also add it to Staging (or import from Production as a one-shot seed, not as continuous sync).

## Spec and project tracking

- Implementation spec: Linear doc slug `c3ea98927c84` (Website project).
- Issues: Linear team VM, project Website.

## Conventions

See [CLAUDE.md](./CLAUDE.md) for the full set of behavioral rules (Spanish/English usage, currency defaults, no em dashes, link conventions, etc.).
