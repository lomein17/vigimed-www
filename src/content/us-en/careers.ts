export interface RoleOption {
  value: 'clinical' | 'engineering' | 'product' | 'sales' | 'operations' | 'other';
  label: string;
}

export interface CareersContent {
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
  };
  mission: {
    heading: string;
    paragraphs: ReadonlyArray<string>;
  };
  zeroState: {
    heading: string;
    body: string;
  };
  form: {
    labels: {
      name: string;
      workEmail: string;
      roleOfInterest: string;
      message: string;
      messageOptional: string;
    };
    placeholders: {
      roleOfInterest: string;
      message: string;
    };
    options: ReadonlyArray<RoleOption>;
    errors: {
      required: string;
      invalidEmail: string;
    };
    consentNote: string;
    submit: string;
    submitting: string;
    confirmation: string;
  };
}

export const careersContent: CareersContent = {
  hero: {
    eyebrow: '[PLACEHOLDER: careers.hero.eyebrow]',
    headline: '[PLACEHOLDER: careers.hero.headline]',
    subhead: '[PLACEHOLDER: careers.hero.subhead]',
  },
  mission: {
    heading: '[PLACEHOLDER: careers.mission.heading]',
    paragraphs: [
      '[PLACEHOLDER: careers.mission.paragraph_1]',
      '[PLACEHOLDER: careers.mission.paragraph_2]',
    ],
  },
  zeroState: {
    heading: '[PLACEHOLDER: careers.zeroState.heading]',
    body: '[PLACEHOLDER: careers.zeroState.body]',
  },
  form: {
    labels: {
      name: 'Name',
      workEmail: 'Work email',
      roleOfInterest: 'Role of interest',
      message: 'Message',
      messageOptional: '(optional)',
    },
    placeholders: {
      roleOfInterest: 'Select a role area',
      message: 'Tell us briefly what you would like to work on.',
    },
    options: [
      { value: 'clinical', label: 'Clinical' },
      { value: 'engineering', label: 'Engineering' },
      { value: 'product', label: 'Product' },
      { value: 'sales', label: 'Sales' },
      { value: 'operations', label: 'Operations' },
      { value: 'other', label: 'Other' },
    ],
    errors: {
      required: 'This field is required.',
      invalidEmail: 'Enter a valid email address.',
    },
    consentNote: '[PLACEHOLDER: careers.form.consentNote]',
    submit: 'Join the talent network',
    submitting: 'Submitting...',
    confirmation: '[PLACEHOLDER: careers.form.confirmation]',
  },
};
