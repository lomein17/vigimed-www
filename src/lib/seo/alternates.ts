import type { Metadata } from 'next';

import { hrefFor, localeConfig, locales, type Locale, type RouteKey } from '@/lib/i18n';
import { SITE_URL, type PageKey } from '@/lib/seo/constants';

const pageKeyToRouteKey: Record<PageKey, RouteKey> = {
  home: 'home',
  platform: 'platform',
  contact: 'contact',
  comingSoon: 'useCases',
};

export function routeKeyFor(page: PageKey): RouteKey {
  return pageKeyToRouteKey[page];
}

// Next typs alternates.languages with a finite mapped type (BCP-47 codes
// plus 'x-default'). Build the record as a plain string-keyed object and
// cast on assignment; our hreflangs ('es-MX', 'en-US') are valid LangCodes
// but TS can't narrow localeConfig[l].hreflang that far.
type AlternatesLanguages = NonNullable<NonNullable<Metadata['alternates']>['languages']>;

// x-default points at the MX equivalent per spec §2.2 (MX is primary).
export function generateAlternates(
  locale: Locale,
  page: PageKey,
): Metadata['alternates'] {
  const route = routeKeyFor(page);
  const canonical = `${SITE_URL}${hrefFor(locale, route)}`;

  const byKey: Record<string, string> = {
    'x-default': `${SITE_URL}${hrefFor('mx-es', route)}`,
  };
  for (const l of locales) {
    byKey[localeConfig[l].hreflang] = `${SITE_URL}${hrefFor(l, route)}`;
  }

  return {
    canonical,
    languages: byKey as AlternatesLanguages,
  };
}
