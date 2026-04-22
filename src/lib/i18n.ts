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
