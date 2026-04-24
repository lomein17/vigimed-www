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
- Every pull request gets an auto-generated preview URL.
- The `main` branch deploys to production at `vigimed.ai`.

## Repo layout

- `proxy.ts` — root request handler (locale detection and redirects). Next 16 renamed `middleware` to `proxy`; same functionality.
- `src/app/[locale]/` — locale-scoped routes. Pages enforce locale-slug pairing via `notFound()`.
- `src/content/{locale}/` — typed copy modules per section.
- `src/lib/i18n.ts` — single source of truth for locales, default locale, and per-locale config.

## Feature flags

### `NEXT_PUBLIC_SHOW_HOME`

Gates the post-repositioning Home (Hero + MX Capabilities) at `/{locale}/`. When the
value is the literal string `"true"`, the locale root renders the new Home. Any
other value (including unset) redirects to the chromeless ComingSoon
(`/{locale}/coming-soon` for US, `/{locale}/proximamente` for MX).

Vercel scoping:

| Environment | Value | Effect |
| --- | --- | --- |
| Production | `false` | `/` redirects to ComingSoon. Pre-launch landing preserved. |
| Preview | `true` | New Home renders on the main preview URL for UAT. |
| Development | `true` | New Home renders under `next dev`. |

**Release action:** flipping production to `"true"` ships the new Home to
`www.vigimed.ai`. Vercel does not auto-redeploy when you change environment
variables, so after editing the production value in the Vercel dashboard you
must trigger a redeploy (either push a commit or use "Redeploy" on the latest
production deployment). Preview values take effect on the next git push.

## Spec and project tracking

- Implementation spec: Linear doc slug `c3ea98927c84` (Website project).
- Issues: Linear team VM, project Website.

## Conventions

See [CLAUDE.md](./CLAUDE.md) for the full set of behavioral rules (Spanish/English usage, currency defaults, no em dashes, link conventions, etc.).
