import type { MetadataRoute } from 'next';

import { hrefFor, localeConfig, locales, type Locale, type RouteKey } from '@/lib/i18n';
import { SITE_URL } from '@/lib/seo/constants';

type SitemapEntryKey = { route: RouteKey; priority: number };

const ENTRIES: SitemapEntryKey[] = [
  { route: 'home', priority: 1.0 },
  { route: 'platform', priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const rows: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const entry of ENTRIES) {
      const languages: Record<string, string> = {};
      for (const l of locales) {
        languages[localeConfig[l].hreflang] = `${SITE_URL}${hrefFor(l, entry.route)}`;
      }
      rows.push({
        url: `${SITE_URL}${hrefFor(locale as Locale, entry.route)}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: entry.priority,
        alternates: { languages },
      });
    }
  }
  return rows;
}
