import type { MetadataRoute } from 'next';

import { getLiveLocales, hrefFor, localeConfig, type RouteKey } from '@/lib/i18n';
import { SITE_URL } from '@/lib/seo/constants';

type SitemapEntryKey = { route: RouteKey; priority: number };

const ENTRIES: SitemapEntryKey[] = [
  { route: 'home', priority: 1.0 },
  { route: 'platform', priority: 0.8 },
  { route: 'careers', priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const rows: MetadataRoute.Sitemap = [];
  const live = getLiveLocales();
  for (const locale of live) {
    for (const entry of ENTRIES) {
      const languages: Record<string, string> = {};
      for (const l of live) {
        languages[localeConfig[l].hreflang] = `${SITE_URL}${hrefFor(l, entry.route)}`;
      }
      rows.push({
        url: `${SITE_URL}${hrefFor(locale, entry.route)}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: entry.priority,
        alternates: { languages },
      });
    }
  }
  return rows;
}
