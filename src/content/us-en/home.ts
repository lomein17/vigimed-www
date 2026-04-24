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

export type SubheadSegment = { text: string; emphasis?: 'bold-amber' };

export interface CapabilitiesContent {
  eyebrow: string;
  heading: string;
  subhead: string;
  cards: CapabilityCard[];
}

export type BreachState = 'green' | 'amber' | 'red';

export interface ProblemInMotionContent {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  frame: string;
  sceneCaption: string;
  banners: Record<BreachState, string>;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    subhead: SubheadSegment[];
    ctaLabel: string;
  };
  capabilities: CapabilitiesContent;
  problemInMotion: ProblemInMotionContent;
  placeholderLabel: string;
}

export const homeContent: HomeContent = {
  hero: {
    eyebrow: 'THE CRITICAL-EVENT RESPONSE PLATFORM',
    headlineLine1: 'Incidents, detected in real time.',
    headlineLine2: 'Solutions, coordinated to closure.',
    subhead: [
      { text: 'Dedicated cameras in your critical care areas detect events that compromise ' },
      { text: 'patient safety', emphasis: 'bold-amber' },
      { text: ' and ' },
      { text: 'quality of care', emphasis: 'bold-amber' },
      { text: ', as they happen. Every detection is confirmed by a human analyst in our Compliance Review Center, so you act on verified events. Each incident is documented in detail, and the patterns that emerge across events reach your team to improve processes and operations.' },
    ],
    ctaLabel: 'Request a consultation',
  },
  capabilities: {
    eyebrow: 'FROM DETECTION TO PREVENTION',
    heading: 'Five capabilities, one complete loop.',
    subhead:
      'Every critical event runs the same loop: detected as it happens, confirmed by a human, coordinated through to response, documented defensibly, and analyzed to improve the next one.',
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
  problemInMotion: {
    eyebrow: 'WHAT HAPPENS WHEN NO ONE SEES',
    headlineLine1: 'A sterile field breach takes three seconds.',
    headlineLine2: 'The harm, months.',
    frame: 'It happens in well-run ORs, without anyone noticing in time.',
    sceneCaption:
      'Dedicated camera in OR 1. Continuous sterile field monitoring.',
    banners: {
      green: 'OR 1 · Sterile field · OK',
      amber:
        'OR 1 · Contamination risk detected · Non-sterile personnel in zone',
      red: 'OR 1 · Sterile field breach',
    },
  },
  placeholderLabel: '[asset pending]',
};
