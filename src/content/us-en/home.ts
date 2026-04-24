export type CapabilityIcon =
  | 'Eye'
  | 'CheckCircle2'
  | 'Zap'
  | 'FileText'
  | 'TrendingUp';

export interface CapabilityCard {
  title: string;
  reveal: string;
  icon: CapabilityIcon;
}

export interface CapabilitiesContent {
  eyebrow: string;
  heading: string;
  subhead: string;
  cards: CapabilityCard[];
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    subhead: string;
    ctaLabel: string;
  };
  capabilities: CapabilitiesContent;
  placeholderLabel: string;
}

export const homeContent: HomeContent = {
  hero: {
    eyebrow: 'THE CRITICAL-EVENT RESPONSE PLATFORM',
    headlineLine1: 'See each event as it happens.',
    headlineLine2: 'Respond in under 60 seconds.',
    subhead:
      "Dedicated cameras in your critical care areas detect life-safety and quality-of-care events the moment they happen. Every detection is confirmed by a human analyst before it dispatches, so you act on verified events, not false alarms. Then we surface the patterns, so the next event doesn't happen at all.",
    ctaLabel: 'Request a consultation',
  },
  capabilities: {
    eyebrow: 'FROM DETECTION TO PREVENTION',
    heading: 'Five capabilities, one complete loop.',
    subhead:
      "Every critical event runs the same loop: detected in real time, confirmed by a human, responded to in under 60 seconds, documented defensibly, and analyzed so the next one doesn't happen.",
    cards: [
      {
        title: 'Detects.',
        reveal:
          'Video analytics identify critical events as they happen, frame by frame.',
        icon: 'Eye',
      },
      {
        title: 'Confirms.',
        reveal:
          'A trained analyst in our Compliance Review Center verifies every detection before any alert fires.',
        icon: 'CheckCircle2',
      },
      {
        title: 'Responds.',
        reveal:
          'The right person receives the alert on the right channel, their response is tracked to confirmation, and escalates if it stalls.',
        icon: 'Zap',
      },
      {
        title: 'Documents.',
        reveal:
          "Every event, response, and outcome becomes a legally defensible record, approved by a human before it's finalized.",
        icon: 'FileText',
      },
      {
        title: 'Analyzes.',
        reveal:
          'Patterns across events reach whoever can act on them, before the next critical event happens.',
        icon: 'TrendingUp',
      },
    ],
  },
  placeholderLabel: '[asset pending]',
};
