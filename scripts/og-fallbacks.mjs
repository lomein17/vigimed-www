#!/usr/bin/env node
// Static OG fallback PNG generator.
//
// Renders public/og-default-mx.png and public/og-default-us.png using the
// same layout as /api/og. Invoked via `npm run og:fallbacks`; not part of the
// build pipeline. Re-run when tagline/home title copy or brand tokens change.
//
// Reads Fraunces 600 and Inter 400 from public/og-fonts/*.woff (committed).
// Those .woff files are the @fontsource static subsets; satori parses .woff
// directly without any decompression step. The site's body typography still
// uses the variable woff2 files under public/fonts/ via next/font/local.

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC_DIR = join(ROOT, 'public');

async function loadSeo(locale) {
  const file = join(ROOT, 'src', 'content', locale, 'seo.ts');
  const text = await readFile(file, 'utf8');
  const tagline = text.match(/tagline:\s*'([^']+)'/)?.[1];
  const homeTitle = text.match(/home:\s*\{[\s\S]*?title:\s*'([^']+)'/)?.[1];
  if (!tagline || !homeTitle) {
    throw new Error(`Could not extract copy from ${file}`);
  }
  return { tagline, homeTitle };
}

async function loadFontArrayBuffer(path) {
  const buf = await readFile(path);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

async function loadLogoDataUrl() {
  const buf = await readFile(join(PUBLIC_DIR, 'brand', 'vigimed-wordmark-on-dark.png'));
  return `data:image/png;base64,${buf.toString('base64')}`;
}

function buildTree({ title, tagline, logoDataUrl }) {
  return {
    type: 'div',
    props: {
      style: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0A1628',
        padding: '64px 80px',
        fontFamily: 'Inter, sans-serif',
      },
      children: [
        {
          type: 'img',
          props: {
            src: logoDataUrl,
            width: 220,
            height: 48,
            style: { objectFit: 'contain' },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              marginTop: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    color: '#FFFFFF',
                    fontSize: 56,
                    lineHeight: 1.1,
                    fontFamily: 'Fraunces, serif',
                    fontWeight: 600,
                    maxWidth: 960,
                  },
                  children: title,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    color: '#A0A8B8',
                    fontSize: 24,
                    lineHeight: 1.3,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                  },
                  children: tagline,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 4,
              backgroundImage: 'linear-gradient(90deg, #20A2E2 0%, #2FBBF7 50%, #20A2E2 100%)',
            },
          },
        },
      ],
    },
  };
}

async function renderPng({ title, tagline, logoDataUrl, fonts }) {
  const tree = buildTree({ title, tagline, logoDataUrl });
  const svg = await satori(tree, { width: 1200, height: 630, fonts });
  const resvg = new Resvg(svg, { background: '#0A1628' });
  return resvg.render().asPng();
}

async function main() {
  const [fraunces, inter, mx, us, logoDataUrl] = await Promise.all([
    loadFontArrayBuffer(join(PUBLIC_DIR, 'og-fonts', 'fraunces-600.woff')),
    loadFontArrayBuffer(join(PUBLIC_DIR, 'og-fonts', 'inter-400.woff')),
    loadSeo('mx-es'),
    loadSeo('us-en'),
    loadLogoDataUrl(),
  ]);

  const fonts = [
    { name: 'Fraunces', data: fraunces, weight: 600, style: 'normal' },
    { name: 'Inter', data: inter, weight: 400, style: 'normal' },
  ];

  const mxPng = await renderPng({
    title: mx.homeTitle,
    tagline: mx.tagline,
    logoDataUrl,
    fonts,
  });
  const usPng = await renderPng({
    title: us.homeTitle,
    tagline: us.tagline,
    logoDataUrl,
    fonts,
  });

  await writeFile(join(PUBLIC_DIR, 'og-default-mx.png'), mxPng);
  await writeFile(join(PUBLIC_DIR, 'og-default-us.png'), usPng);

  process.stdout.write(
    `wrote og-default-mx.png (${mxPng.length} bytes) and og-default-us.png (${usPng.length} bytes)\n`,
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
