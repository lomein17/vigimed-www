export const locales = ['mx-es', 'us-en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'us-en';

export const localeConfig: Record<Locale, {
  country: string;
  language: string;
  currency: string;
  label: string;
  flag: string;
  hreflang: string;
}> = {
  'mx-es': {
    country: 'MX',
    language: 'es',
    currency: 'MXN',
    label: 'Mexico',
    flag: '🇲🇽',
    hreflang: 'es-MX',
  },
  'us-en': {
    country: 'US',
    language: 'en',
    currency: 'USD',
    label: 'United States',
    flag: '🇺🇸',
    hreflang: 'en-US',
  },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const localeShapePattern = /^[a-z]{2}(-[a-z]{2,3})?$/i;

export function isLocaleShaped(value: string): boolean {
  return localeShapePattern.test(value);
}

// =======================================================================
// Routing keys and slug map
// -----------------------------------------------------------------------
// RouteKey is a stable, locale-agnostic identifier for a page that nav and
// other layout components reference. routeSlugs resolves a key to its
// in-locale URL slug ("" for the locale home). Use-cases / why / how-it-works
// do not yet have dedicated pages, so they currently point at the
// locale-appropriate ComingSoon route.
// =======================================================================

export type RouteKey =
  | 'home'
  | 'platform'
  | 'useCases'
  | 'whyVigimed'
  | 'howItWorks'
  | 'contact';

export const routeSlugs: Record<Locale, Record<RouteKey, string>> = {
  'mx-es': {
    home: '',
    platform: 'plataforma',
    useCases: 'proximamente',
    whyVigimed: 'proximamente',
    howItWorks: 'proximamente',
    contact: 'contacto',
  },
  'us-en': {
    home: '',
    platform: 'platform',
    useCases: 'coming-soon',
    whyVigimed: 'coming-soon',
    howItWorks: 'coming-soon',
    contact: 'contact',
  },
};

export function hrefFor(locale: Locale, route: RouteKey): string {
  const slug = routeSlugs[locale][route];
  return slug === '' ? `/${locale}` : `/${locale}/${slug}`;
}

// Compute the equivalent in-locale path for a given current pathname.
// Used by the drawer's locale toggle so /us-en/platform maps to /mx-es/plataforma,
// /mx-es/proximamente maps to /us-en/coming-soon, and so on. Falls back to the
// target locale's home when the current path has no recognized first segment.
export function localizedEquivalent(
  pathname: string,
  fromLocale: Locale,
  toLocale: Locale,
): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] !== fromLocale || segments.length === 1) {
    return `/${toLocale}`;
  }
  const firstSlug = segments[1];
  if (firstSlug === undefined) {
    return `/${toLocale}`;
  }
  const fromMap = routeSlugs[fromLocale];
  const routeKeys = Object.keys(fromMap) as RouteKey[];
  const matchedKey = routeKeys.find((key) => fromMap[key] === firstSlug);
  if (matchedKey === undefined) {
    return `/${toLocale}`;
  }
  const toSlug = routeSlugs[toLocale][matchedKey];
  const tail = segments.slice(2).join('/');
  if (toSlug === '') {
    return tail ? `/${toLocale}/${tail}` : `/${toLocale}`;
  }
  return tail ? `/${toLocale}/${toSlug}/${tail}` : `/${toLocale}/${toSlug}`;
}
