import type { Locale, RouteKey } from '@/lib/i18n';

export type FooterItem = { label: string; route?: RouteKey };

export type FooterColumn = { heading: string; links: FooterItem[] };

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
    columns: readonly [FooterColumn, FooterColumn];
    copyright: { prefix: string; suffix: string };
    legalLinks: readonly [{ label: string }, { label: string }];
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
        heading: 'Solutions',
        links: [
          { label: 'Health Systems' },
          { label: 'Community Hospitals' },
          { label: 'Academic Medical Centers' },
          { label: 'Clinical Labs' },
        ],
      },
      {
        heading: 'About VigiMed',
        links: [
          { label: 'Newsroom' },
          { label: 'Career Opportunities' },
          { label: 'Contact VigiMed', route: 'contact' },
        ],
      },
    ],
    copyright: {
      prefix: 'Copyright © 2026 VigiMed.',
      suffix: 'All rights reserved.',
    },
    legalLinks: [
      { label: 'Privacy Policy' },
      { label: 'Terms of Use' },
    ],
  },
  comingSoon: {
    positioning:
      'VigiMed is the real-time critical-event response platform for hospitals.',
    ctaLabel: 'Contact us',
    ctaMailtoSubject: 'Request for information',
  },
};
