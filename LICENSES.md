# Third-Party Licenses

This file lists third-party assets bundled with the vigimed-www site and
the license under which each is redistributed.

## Fonts

The vigimed.ai marketing site ships two self-hosted fonts: General Sans
(display) and Inter (body / UI). Both are SIL OFL 1.1 and bundled as
Latin + Latin Extended WOFF2 files under `public/fonts/`.

### Inter

- Files: `public/fonts/inter/inter-variable.woff2`
- Role: Body / UI family. Drives body copy, buttons, nav, eyebrows, form
  fields, footer, tabular numerals. Bound to `--font-body` and
  `--font-ui` in `src/app/globals.css`.
- License: SIL Open Font License 1.1
- License URL: https://openfontlicense.org
- Publisher: Rasmus Andersson (rsms.me), distributed via Google Fonts.
- Source: Google Fonts CSS2 endpoint, `latin` subset WOFF2 of Inter v20
  (variable axis, weight range 400 to 700).
- Commercial use: permitted under OFL.

### General Sans

- Files: `public/fonts/general-sans/general-sans-400.woff2`,
  `public/fonts/general-sans/general-sans-700.woff2`
- Role: Display family. Drives h1 through h3, hero headlines, and large
  numeric data callouts. Bound to `--font-display` in
  `src/app/globals.css`.
- License: SIL Open Font License 1.1
- License URL: https://openfontlicense.org
- Publisher: Indian Type Foundry, distributed via Fontshare.
- Source: https://www.fontshare.com/fonts/general-sans (Latin + Latin
  Extended subset, weights 400 Regular and 700 Bold).
- Commercial use: permitted under OFL.
