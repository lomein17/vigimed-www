# Font Licenses

Fonts in this directory are self-hosted candidates for the vigimed.ai marketing
site (spec c3ea98927c84 §4.2). Pre-pruning bundle is three families; after
selection, two will be removed. Licenses and sources are recorded here so the
decision is auditable.

## DM Sans

- Files: `dm-sans/dm-sans-variable.woff2`
- License: SIL Open Font License 1.1
- License URL: https://openfontlicense.org
- Source: Google Fonts (fonts.googleapis.com CSS2 endpoint, served from
  fonts.gstatic.com). Specifically the `latin` subset WOFF2 of DM Sans v17.
- Notes: This file is a variable-weight font covering the 100 to 1000 weight
  axis. We declare it as weight range `400 700` in next/font/local. The `latin`
  subset includes Latin-1 Supplement (U+0000-00FF), which covers the Spanish
  accented characters used on this site (ñ, á, é, í, ó, ú). Latin Extended
  (U+0100+) is not required for Spanish or US English.
- Commercial use: permitted under OFL.

## General Sans

- Files: `general-sans/general-sans-400.woff2`, `general-sans/general-sans-700.woff2`
- License: Fontshare Free Font EULA (FFL)
- License URL: https://www.fontshare.com/terms
- Source: Fontshare API (api.fontshare.com/v2/fonts/download/general-sans), ZIP
  extracted, static Regular and Bold WOFF2 files copied.
- Publisher: Indian Type Foundry (ITF).
- Commercial use: permitted under FFL for web embedding, unlimited duration,
  unlimited scale, any location. Redistribution of the font files as standalone
  assets is prohibited; embedding them in a deployed website is the intended
  use.

## Satoshi

- Files: `satoshi/satoshi-400.woff2`, `satoshi/satoshi-700.woff2`
- License: Fontshare Free Font EULA (FFL)
- License URL: https://www.fontshare.com/terms
- Source: Fontshare API (api.fontshare.com/v2/fonts/download/satoshi), ZIP
  extracted, static Regular and Bold WOFF2 files copied.
- Publisher: Indian Type Foundry (ITF).
- Commercial use: permitted under FFL. Same embedding-allowed / standalone
  redistribution-prohibited terms as General Sans.

## After font selection

Once the winning family is chosen, delete the two losing directories and
prune this file to the surviving license entry.
