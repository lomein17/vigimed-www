import type { Locale, RouteKey } from '@/lib/i18n';

export interface SharedContent {
  nav: {
    primary: Array<{ label: string; route: RouteKey }>;
    drawer: Array<{ label: string; route: RouteKey }>;
    cta: { label: string; route: 'contact' };
  };
  localeSelector: {
    currentLabel: string;
    otherLabel: string;
    otherLocale: Locale;
  };
  footer: { columns: Array<{ heading: string; links: Array<{ label: string; href: string }> }>; copyright: string };
  tagline: string;
  comingSoon: {
    heading: string;
  };
}

export const sharedContent: SharedContent = {
  nav: {
    primary: [
      { label: 'Platform', route: 'platform' },
      { label: 'Use Cases', route: 'useCases' },
      { label: 'Contact', route: 'contact' },
    ],
    drawer: [
      { label: 'Home', route: 'home' },
      { label: 'Platform', route: 'platform' },
      { label: 'Use Cases', route: 'useCases' },
      { label: 'Why VigiMed', route: 'whyVigimed' },
      { label: 'How It Works', route: 'howItWorks' },
      { label: 'Contact', route: 'contact' },
    ],
    cta: { label: 'Request a demo', route: 'contact' },
  },
  localeSelector: {
    currentLabel: 'United States',
    otherLabel: 'Mexico',
    otherLocale: 'mx-es',
  },
  footer: { columns: [], copyright: '' },
  tagline: 'Compliance you can see.',
  comingSoon: {
    heading: 'Coming Soon',
  },
};
