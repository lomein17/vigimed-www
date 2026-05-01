import type { Locale, RouteKey } from '@/lib/i18n';

export type FooterItem = { label: string; route?: RouteKey; slug?: string };

export type FooterColumn = { heading: string; links: FooterItem[] };

export interface SharedContent {
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
          { label: 'Health Systems', slug: '/us-en/health-systems' },
          { label: 'Community Hospitals', slug: '/us-en/community-hospitals' },
          { label: 'Academic Medical Centers', slug: '/us-en/academic-medical-centers' },
          { label: 'Clinical Labs', slug: '/us-en/clinical-labs' },
        ],
      },
      {
        heading: 'About VigiMed',
        links: [
          { label: 'Newsroom' },
          { label: 'Career Opportunities' },
          { label: 'Contact Us', slug: '/us-en#final-cta' },
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
