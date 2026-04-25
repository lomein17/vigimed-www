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

export interface MoatClaim {
  subEyebrow: string;
  heading: string;
  // Optional second designed line. MX Claim B renders the heading as
  // two lines to avoid wrapping after "herramientas"; US claims omit it.
  headingLine2?: string;
  body: string;
}

export interface MoatContent {
  eyebrow: string;
  h2Line1: string;
  h2Line2: string;
  claims: MoatClaim[];
}

export type OrgTypeValue =
  | 'hospital_200_plus'
  | 'hospital_100_199'
  | 'hospital_50_99'
  | 'hospital_under_50'
  | 'maternity_clinic'
  | 'system_or_group'
  | 'clinical_lab'
  | 'public_government'
  | 'other';

export interface OrgTypeOption {
  value: OrgTypeValue;
  label: string;
}

export interface FinalCtaContent {
  eyebrow: string;
  h2: string;
  frame: string;
  steps: ReadonlyArray<{ heading: string; body: string }>;
  form: {
    labels: {
      name: string;
      jobTitle: string;
      organizationName: string;
      organizationType: string;
      workEmail: string;
      phone: string;
      phoneOptional: string;
    };
    placeholders: {
      organizationType: string;
    };
    options: ReadonlyArray<OrgTypeOption>;
    submit: string;
    submitting: string;
    consentNote: string;
    errors: {
      required: string;
      invalidEmail: string;
    };
  };
  confirmation: string;
}

export interface FinalCtaPayload {
  name: string;
  jobTitle: string;
  organizationName: string;
  organizationType: OrgTypeValue;
  workEmail: string;
  phone: string;
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
  moat: MoatContent;
  finalCta: FinalCtaContent;
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
    ctaLabel: 'Request a demo',
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
  moat: {
    eyebrow: 'WHY ONLY VIGIMED',
    h2Line1: 'Accuracy at the detection layer.',
    h2Line2: 'One architecture at the platform layer.',
    claims: [
      {
        subEyebrow: 'THE ACCURACY LAYER',
        heading: 'Every detection is confirmed by a human.',
        body: 'A trained analyst in our Compliance Review Center reviews every detection before any alert fires. False positives stop here. When your team is notified, the event is verified. You never act on noise.',
      },
      {
        subEyebrow: 'THE ARCHITECTURE LAYER',
        heading: 'One platform, not a stack to assemble.',
        body: 'Detection, confirmation, coordination, documentation, and analysis run on a single architecture. VigiMed installs and operates the cameras, the analytics, the Compliance Review Center, and the reporting layer. No hospital IT integration required to begin.',
      },
    ],
  },
  finalCta: {
    eyebrow: 'GET STARTED',
    h2: 'Talk to our team',
    frame:
      'Speak with our team to understand scope, cost, integrations, and what a deployment actually looks like.',
    steps: [
      {
        heading: 'Reach Out',
        body: 'A team member at VigiMed will reply by email within one business day to confirm receipt and propose call times.',
      },
      {
        heading: 'Discuss Fit',
        body: "A conversation about your operation, your critical service areas, and where the pain is, alongside a walk-through of the platform.",
      },
      {
        heading: 'Tailored Solution',
        body: "We will provide a comprehensive proposal based on your operation's characteristics, and a roadmap.",
      },
    ],
    form: {
      labels: {
        name: 'Name',
        jobTitle: 'Job Title',
        organizationName: 'Organization Name',
        organizationType: 'Organization Type',
        workEmail: 'Work Email',
        phone: 'Phone',
        phoneOptional: '(optional)',
      },
      placeholders: {
        organizationType: 'Select one',
      },
      options: [
        { value: 'hospital_200_plus', label: 'Hospital, over 200 beds' },
        { value: 'hospital_100_199', label: 'Hospital, 100-199 beds' },
        { value: 'hospital_50_99', label: 'Hospital, 50-99 beds' },
        { value: 'hospital_under_50', label: 'Hospital, under 50 beds' },
        { value: 'maternity_clinic', label: 'Maternity clinic' },
        { value: 'system_or_group', label: 'Hospital system or group' },
        { value: 'clinical_lab', label: 'Clinical laboratory' },
        { value: 'public_government', label: 'Public or government facility' },
        { value: 'other', label: 'Other' },
      ],
      submit: 'Request a demo',
      submitting: 'Submitting...',
      consentNote:
        'By submitting this form with my contact information, I agree the information may be used to receive occasional communications from VigiMed about its products and services. I may unsubscribe at any time.',
      errors: {
        required: 'Required field',
        invalidEmail: 'Please enter a valid email address',
      },
    },
    confirmation:
      'Thank you. A team member will reply by email within one business day.',
  },
  placeholderLabel: '[asset pending]',
};
