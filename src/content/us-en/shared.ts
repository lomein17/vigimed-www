import type { Locale, RouteKey } from '@/lib/i18n';

export type FooterLink =
  | { label: string; href: string; external?: boolean }
  | { label: string; route: RouteKey };

export type MarketSegmentIcon = 'hospital' | 'clinic' | 'lab';

export interface SharedContent {
  nav: {
    marketSegments: Array<{ label: string; route: RouteKey; icon: MarketSegmentIcon }>;
    contactCta: { label: string; route: 'contact' };
    demoCta: { label: string; route: 'contact' };
    drawer: Array<{ label: string; route: RouteKey }>;
  };
  localeSelector: {
    currentLabel: string;
    otherLabel: string;
    otherLocale: Locale;
  };
  footer: {
    columns: Array<{ heading: string; links: FooterLink[] }>;
    copyright: string;
    privacyLabel: string;
  };
  comingSoon: {
    positioning: string;
    ctaLabel: string;
    ctaMailtoSubject: string;
  };
}

export const sharedContent: SharedContent = {
  nav: {
    marketSegments: [
      { label: 'Hospitals', route: 'platform', icon: 'hospital' },
      { label: 'Labs', route: 'platform', icon: 'lab' },
    ],
    contactCta: { label: 'Contact us', route: 'contact' },
    demoCta: { label: 'Book a demo', route: 'contact' },
    drawer: [
      { label: 'Home', route: 'home' },
      { label: 'Platform', route: 'platform' },
      { label: 'Use Cases', route: 'useCases' },
      { label: 'Why VigiMed', route: 'whyVigimed' },
      { label: 'How It Works', route: 'howItWorks' },
      { label: 'Contact', route: 'contact' },
    ],
  },
  localeSelector: {
    currentLabel: 'United States',
    otherLabel: 'Mexico',
    otherLocale: 'mx-es',
  },
  footer: {
    columns: [
      {
        heading: 'Platform',
        links: [
          { label: 'Home', route: 'home' },
          { label: 'Platform', route: 'platform' },
          { label: 'Use Cases', route: 'useCases' },
          { label: 'Why VigiMed', route: 'whyVigimed' },
          { label: 'How It Works', route: 'howItWorks' },
          { label: 'Contact', route: 'contact' },
        ],
      },
      {
        heading: 'Company',
        links: [{ label: 'Contact', route: 'contact' }],
      },
      {
        heading: 'Contact',
        links: [
          { label: 'contact@vigimed.ai', href: 'mailto:contact@vigimed.ai' },
        ],
      },
    ],
    copyright: '© VigiMed 2026',
    privacyLabel: 'Privacy Policy',
  },
  comingSoon: {
    positioning:
      'VigiMed is the real-time critical-event response platform for hospitals.',
    ctaLabel: 'Contact us',
    ctaMailtoSubject: 'Request for information',
  },
};
