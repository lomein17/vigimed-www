import type { Metadata } from 'next';

import { hrefFor, localeConfig, type Locale } from '@/lib/i18n';
import { generateAlternates, routeKeyFor } from '@/lib/seo/alternates';
import { OG_DIMENSIONS, SITE_URL, type PageKey } from '@/lib/seo/constants';
import { seoContent as mxSeo } from '@/content/mx-es/seo';
import { seoContent as usSeo } from '@/content/us-en/seo';
import type { SeoContent } from '@/content/us-en/seo';

const seoByLocale: Record<Locale, SeoContent> = {
  'mx-es': mxSeo,
  'us-en': usSeo,
};

export function getPageMetadata(locale: Locale, page: PageKey): Metadata {
  const content = seoByLocale[locale];
  const { title, description } = content.pages[page];
  const cfg = localeConfig[locale];
  const canonical = `${SITE_URL}${hrefFor(locale, routeKeyFor(page))}`;
  const ogLocale = cfg.hreflang.replace('-', '_');
  const fallbackUrl = `/og-default-${cfg.country.toLowerCase()}.png`;
  const dynamicUrl = `/api/og?locale=${locale}&page=${page}`;

  const metadata: Metadata = {
    title,
    description,
    alternates: generateAlternates(locale, page),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: ogLocale,
      url: canonical,
      siteName: content.siteName,
      images: [
        {
          url: dynamicUrl,
          width: OG_DIMENSIONS.width,
          height: OG_DIMENSIONS.height,
          alt: title,
        },
        {
          url: fallbackUrl,
          width: OG_DIMENSIONS.width,
          height: OG_DIMENSIONS.height,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [dynamicUrl],
    },
  };

  if (page === 'comingSoon') {
    metadata.robots = { index: false, follow: true };
  }

  return metadata;
}
