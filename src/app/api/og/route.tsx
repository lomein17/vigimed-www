import { ImageResponse } from 'next/og';

import { isLocale, type Locale } from '@/lib/i18n';
import { OG_DIMENSIONS } from '@/lib/seo/constants';
import { seoContent as mxSeo } from '@/content/mx-es/seo';
import { seoContent as usSeo } from '@/content/us-en/seo';
import type { SeoContent } from '@/content/us-en/seo';

export const runtime = 'edge';
export const contentType = 'image/png';

const PAGE_KEYS = ['home', 'platform', 'contact', 'comingSoon'] as const;
type PageKey = (typeof PAGE_KEYS)[number];

function isPageKey(value: string): value is PageKey {
  return (PAGE_KEYS as readonly string[]).includes(value);
}

const seoByLocale: Record<Locale, SeoContent> = {
  'mx-es': mxSeo,
  'us-en': usSeo,
};

// next/og (satori) parses ttf, otf, and woff only. public/og-fonts/ ships
// static .woff subsets of Fraunces 600 and Inter 400 specifically for OG
// rendering; the site's body typography under public/fonts/ is variable woff2
// which satori cannot parse. Wrapped in try/catch so a fetch failure degrades
// to satori's default sans rather than failing the whole response.
async function loadFonts(
  origin: string,
): Promise<Array<{ name: string; data: ArrayBuffer; weight: 400 | 600; style: 'normal' }>> {
  try {
    const [fraunces, inter] = await Promise.all([
      fetch(new URL('/og-fonts/fraunces-600.woff', origin)).then((r) =>
        r.ok ? r.arrayBuffer() : Promise.reject(new Error('fraunces not found')),
      ),
      fetch(new URL('/og-fonts/inter-400.woff', origin)).then((r) =>
        r.ok ? r.arrayBuffer() : Promise.reject(new Error('inter not found')),
      ),
    ]);
    return [
      { name: 'Fraunces', data: fraunces, weight: 600, style: 'normal' },
      { name: 'Inter', data: inter, weight: 400, style: 'normal' },
    ];
  } catch {
    return [];
  }
}

async function loadLogo(origin: string): Promise<string | null> {
  try {
    const res = await fetch(new URL('/brand/vigimed-wordmark-on-dark.png', origin));
    if (!res.ok) return null;
    const buf = new Uint8Array(await res.arrayBuffer());
    let binary = '';
    for (let i = 0; i < buf.length; i++) binary += String.fromCharCode(buf[i] as number);
    // btoa is available in Edge runtime.
    return `data:image/png;base64,${btoa(binary)}`;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);
  const localeParam = searchParams.get('locale') ?? '';
  const pageParam = searchParams.get('page') ?? '';

  if (!isLocale(localeParam)) {
    return new Response('Invalid locale', { status: 400 });
  }
  if (!isPageKey(pageParam)) {
    return new Response('Invalid page', { status: 400 });
  }

  const content = seoByLocale[localeParam];
  const title = content.pages[pageParam].title;

  const [fonts, logoDataUrl] = await Promise.all([loadFonts(origin), loadLogo(origin)]);

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0A1628',
          padding: '64px 80px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {logoDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoDataUrl} alt="VigiMed" width={220} height={48} style={{ objectFit: 'contain' }} />
        ) : (
          <div style={{ color: '#FFFFFF', fontSize: 36, fontWeight: 700, letterSpacing: '0.02em' }}>VigiMed</div>
        )}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div
            style={{
              color: '#FFFFFF',
              fontSize: 56,
              lineHeight: 1.1,
              fontFamily: 'Fraunces, serif',
              fontWeight: 600,
              maxWidth: 960,
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 4,
            backgroundImage: 'linear-gradient(90deg, #20A2E2 0%, #2FBBF7 50%, #20A2E2 100%)',
          }}
        />
      </div>
    ),
    {
      width: OG_DIMENSIONS.width,
      height: OG_DIMENSIONS.height,
      ...(fonts.length > 0 ? { fonts } : {}),
    },
  );
}
