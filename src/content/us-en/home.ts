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
    ctaShowArrow: boolean;
  };
  capabilities: CapabilitiesContent | null;
  placeholderLabel: string;
  usCapabilitiesDeferLabel?: string;
}

export const homeContent: HomeContent = {
  hero: {
    eyebrow: 'THE CRITICAL-EVENT RESPONSE PLATFORM',
    headlineLine1: 'See each event as it happens.',
    headlineLine2: 'Respond in under 60 seconds.',
    subhead:
      "Dedicated cameras in your critical care areas detect life-safety and quality-of-care events the moment they happen. Every detection is confirmed by a human analyst before it dispatches, so you act on verified events, not false alarms. Then we surface the patterns, so the next event doesn't happen at all.",
    ctaLabel: 'Request consultation',
    ctaShowArrow: true,
  },
  capabilities: null,
  placeholderLabel: '[asset pending]',
  usCapabilitiesDeferLabel: '[US Capabilities pending parity sync]',
};
