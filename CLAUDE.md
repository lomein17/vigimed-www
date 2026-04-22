@AGENTS.md

# vigimed-www

Marketing site for vigimed.ai. Next.js, App Router, custom path-based i18n, deployed on Vercel. Separate repo from `vigimed` (the in-app SPA at app.vigimed.ai); never import from or copy code out of that repo.

## Session protocol

1. Read this file first, including the AGENTS.md import above.
2. Load the Website project spec (Linear doc slug `c3ea98927c84`) for product intent.
3. Check the Linear cycle in team VM, project Website, for the current issue.

## Universal rules

- Mexican medical Spanish for `mx-es` content only; US English for `us-en` content only. Never mix.
- No em dashes anywhere in copy or code comments.
- USD is the default currency in business copy. MXN appears only in `mx-es` content tied to Mexican hospital stats.
- TypeScript strict mode is enforced (`noUncheckedIndexedAccess` on). Path alias `@/` resolves to `src/`.
- External links must be `target="_blank" rel="noopener noreferrer"`.
- No emojis in code or copy unless the spec calls for one (locale flags in `localeConfig` are an exception).

## Architecture

- Custom i18n with two locales: `mx-es` and `us-en`. No `next-intl` or other locale libraries.
- Routing is path-based: `/mx-es/*` and `/us-en/*`. Localized slugs (`plataforma` vs `platform`, `contacto` vs `contact`, `proximamente` vs `coming-soon`) are validated per page; a wrong-locale request returns `notFound()`.
- Locale detection lives in `proxy.ts` at the repo root (Next 16 renamed `middleware` to `proxy`). Order: cookie `vm-locale` first, then Vercel `x-vercel-ip-country` header (MX maps to `mx-es`), then `defaultLocale` (`us-en`).
- Per-locale copy lives in `src/content/{locale}/{section}.ts` as typed modules. Add new sections by creating a parallel pair of files in both locale folders.
- The `<html lang>` attribute is set in `src/app/[locale]/layout.tsx` from `localeConfig[locale].hreflang`. There is no root `app/layout.tsx`; every effective route lives under `[locale]`.

## Git

- `main` is production. Branch naming: `vm-XXX-short-description`. PRs are required; pushing direct to `main` is forbidden.
- Vercel auto-creates a preview deployment per PR. `main` deploys to production.

## Do not

- Touch or import from `~/code/vigimed` (the SPA repo).
- Add `next-intl`, `next-i18next`, or any locale-resolution library; the custom proxy is intentional.
- Hardcode country lists, currency lists, or locale codes anywhere outside `src/lib/i18n.ts`. Always import from `locales` / `localeConfig`.
- Create an `APP_VERSION` file or constant; this repo intentionally has no version tracking.
- Move Linear issues. Cowork owns Linear state.

## Linear

- Team: VM. Project: Website (id `9424b006-2502-455b-944b-ab71e0833221`).
- Apply the `v1` label to anything that blocks the public launch.
