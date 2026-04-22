# Font Licenses

Fonts in this directory are the self-hosted production typography for the
vigimed.ai marketing site (spec c3ea98927c84 §4.2). Ship is Fraunces
(display) + Inter (body / UI). Both are SIL OFL 1.1 and bundled as Latin
subset variable WOFF2.

## Fraunces

- Files: `fraunces/fraunces-variable.woff2`
- Role: Display family. Drives h1 through h3, hero headlines, and large
  numeric data callouts. Bound to `--font-display` in `globals.css`.
- License: SIL Open Font License 1.1
- License URL: https://openfontlicense.org
- Source: Google Fonts CSS2 endpoint (fonts.googleapis.com), `latin`
  subset WOFF2 of Fraunces v38 (variable weight + optical size axes).
- Publisher: Undercase Type (Phaedra Charles, Flavia Zimbardi).
- Notes: Selected as a free proxy for Tiempos Headline (a paid Klim Type
  Foundry font). Fraunces is NOT a drop-in equivalent for Tiempos; it was
  chosen for aesthetic similarity and OFL redistribution rights. If the
  decision flips to license Tiempos Headline before v1 launch, the
  licensed WOFF2 replaces this file and the `--font-display` binding in
  `globals.css` changes accordingly.
- Commercial use: permitted under OFL.

## Inter

- Files: `inter/inter-variable.woff2`
- Role: Body / UI family. Drives body copy, buttons, nav, eyebrows, form
  fields, footer, tabular numerals. Bound to `--font-body` and
  `--font-ui` in `globals.css`.
- License: SIL Open Font License 1.1
- License URL: https://openfontlicense.org
- Source: Google Fonts CSS2 endpoint (fonts.googleapis.com), `latin`
  subset WOFF2 of Inter v20 (variable axis).
- Publisher: Rasmus Andersson (rsms.me).
- Notes: Variable-weight font file. Declared as weight range `400 700`
  in `next/font/local`.
- Commercial use: permitted under OFL.
