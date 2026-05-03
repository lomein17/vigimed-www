// US-EN parity fill for the Public Hospitals MX segment. Public Hospitals
// MX is mx-es-only per Site Architecture parity rule, so this file is
// never rendered: the route guard at
// src/app/[locale]/(chrome)/hospitales-publicos/page.tsx returns
// notFound() for non-mx-es requests. We keep a us-en parity fixture so
// the chassis-preview dev route can render the same shape under us-en
// and so future us-en segments (Health Systems / IDNs US, etc.) have a
// reference layout.

import type { ChassisFill } from '@/lib/chassis/slots';
import { EM_DASH_GLYPH } from '@/lib/chassis/constants';

const p = (text: string) =>
  ({ 'mx-es': text, 'us-en': text }) as const;

export const hospitalesPublicosFillUsEn: ChassisFill = {
  hero: {
    contextBar: p('[context bar pending]'),
    eyebrow: p('[eyebrow pending]'),
    h1Line1: {
      'mx-es': [{ text: '[H1 line 1 pending]' }],
      'us-en': [{ text: '[H1 line 1 pending]' }],
    },
    h1Line2: {
      'mx-es': [{ text: '[H1 line 2 pending]' }],
      'us-en': [{ text: '[H1 line 2 pending]' }],
    },
    subhead: {
      'mx-es': [{ text: '[subhead pending]' }],
      'us-en': [{ text: '[subhead pending]' }],
    },
    ctaSecondaryTarget: 'none',
    metrics: [
      {
        'mx-es': { value: '--', label: '[metric 1]' },
        'us-en': { value: '--', label: '[metric 1]' },
      },
      {
        'mx-es': { value: '--', label: '[metric 2]' },
        'us-en': { value: '--', label: '[metric 2]' },
      },
      {
        'mx-es': { value: '--', label: '[metric 3]' },
        'us-en': { value: '--', label: '[metric 3]' },
      },
    ],
    video: { desktop: '', mobile: '', poster: '' },
  },

  section2: {
    eyebrow: p('[S2 eyebrow pending]'),
    heading: p('[S2 heading pending]'),
    pressures: [
      p('[pressure 1 pending]'),
      p('[pressure 2 pending]'),
      p('[pressure 3 pending]'),
      p('[pressure 4 pending]'),
    ],
    ucEyebrow: p('[UC strip eyebrow pending]'),
    ucHeading: p('[UC strip heading pending]'),
    ucCards: [
      { name: p('[UC1 pending]'), framing: p('[framing 1 pending]') },
      { name: p('[UC2 pending]'), framing: p('[framing 2 pending]') },
      { name: p('[UC3 pending]'), framing: p('[framing 3 pending]') },
      { name: p('[UC4 pending]'), framing: p('[framing 4 pending]') },
    ],
  },

  section3: {
    eyebrow: p('[S3 eyebrow pending]'),
    heading: p('[S3 heading pending]'),
    tabCount: 4,
    tabDefault: 1,
    tabs: [
      {
        label: p('[Role 1]'),
        result: p('[result 1 pending]'),
        step: p('[step 1 pending]'),
        quote: p('[quote 1 pending]'),
        regulatory: p('[regulatory 1 pending]'),
      },
      {
        label: p('[Role 2]'),
        result: p('[result 2 pending]'),
        step: p('[step 2 pending]'),
        quote: p('[quote 2 pending]'),
        regulatory: p('[regulatory 2 pending]'),
      },
      {
        label: p('[Role 3]'),
        result: p('[result 3 pending]'),
        step: p('[step 3 pending]'),
        quote: p('[quote 3 pending]'),
        regulatory: p('[regulatory 3 pending]'),
      },
      {
        label: p('[Role 4]'),
        result: p('[result 4 pending]'),
        step: p('[step 4 pending]'),
        quote: p('[quote 4 pending]'),
        regulatory: p('[regulatory 4 pending]'),
      },
    ],
  },

  section4: {
    zoneAEyebrow: p('[S4 eyebrow pending]'),
    zoneAMetrics: [
      { 'mx-es': { value: '[pending]', label: '[pending]' }, 'us-en': { value: '[pending]', label: '[pending]' } },
      { 'mx-es': { value: EM_DASH_GLYPH, label: '[pending]' }, 'us-en': { value: EM_DASH_GLYPH, label: '[pending]' } },
      { 'mx-es': { value: '[pending]', label: '[pending]' }, 'us-en': { value: '[pending]', label: '[pending]' } },
      { 'mx-es': { value: '[pending]', label: '[pending]' }, 'us-en': { value: '[pending]', label: '[pending]' } },
    ],
    zoneBEyebrow: p('[S4.B eyebrow pending]'),
    zoneBVideo: { desktop: '', mobile: '', poster: '' },
    zoneBFrame: p('[S4.B frame pending]'),
    zoneBUcAnchor: '',
    zoneCEyebrow: p('[S4.C eyebrow pending]'),
    zoneCChips: {
      'mx-es': ['[chip 1]', '[chip 2]', '[chip 3]', '[chip 4]'],
      'us-en': ['[chip 1]', '[chip 2]', '[chip 3]', '[chip 4]'],
    },
  },

  section5: {
    faqEyebrow: p('[FAQ eyebrow pending]'),
    faqItems: [
      { question: p('[question 1 pending]'), answer: p('[answer 1 pending]') },
      { question: p('[question 2 pending]'), answer: p('[answer 2 pending]') },
      { question: p('[question 3 pending]'), answer: p('[answer 3 pending]') },
    ],
    ctaEyebrow: p('[CTA eyebrow pending]'),
    ctaHeadingLine1: {
      'mx-es': [{ text: '[heading line 1 pending]' }],
      'us-en': [{ text: '[heading line 1 pending]' }],
    },
    ctaHeadingLine2: {
      'mx-es': [{ text: '[heading line 2 pending]' }],
      'us-en': [{ text: '[heading line 2 pending]' }],
    },
    ctaFrame: p('[frame pending]'),
    ctaReassurance: p('[reassurance pending]'),
  },

  sticky: {
    promptMobile: p('[sticky prompt pending]'),
    promptDesktop: p('[sticky prompt pending]'),
  },
};
