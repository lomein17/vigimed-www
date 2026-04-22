export interface ContactContent {
  hero: { headline: string; subhead: string };
  form: {
    nameLabel: string;
    emailLabel: string;
    organizationLabel: string;
    messageLabel: string;
    submitLabel: string;
    successMessage: string;
    errorMessage: string;
  };
}

export const contactContent: ContactContent = {
  hero: { headline: '', subhead: '' },
  form: {
    nameLabel: '',
    emailLabel: '',
    organizationLabel: '',
    messageLabel: '',
    submitLabel: '',
    successMessage: '',
    errorMessage: '',
  },
};
