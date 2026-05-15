import type { CareersContent } from '@/content/us-en/careers';

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
      name: 'Nombre',
      workEmail: 'Correo electrónico de trabajo',
      roleOfInterest: 'Área de interés',
      message: 'Mensaje',
      messageOptional: '(opcional)',
    },
    placeholders: {
      roleOfInterest: 'Selecciona un área',
      message: 'Cuéntanos brevemente en qué te gustaría trabajar.',
    },
    options: [
      { value: 'clinical', label: 'Clínico' },
      { value: 'engineering', label: 'Ingeniería' },
      { value: 'product', label: 'Producto' },
      { value: 'sales', label: 'Ventas' },
      { value: 'operations', label: 'Operaciones' },
      { value: 'other', label: 'Otro' },
    ],
    errors: {
      required: 'Este campo es obligatorio.',
      invalidEmail: 'Ingresa un correo electrónico válido.',
    },
    consentNote: '[PLACEHOLDER: careers.form.consentNote]',
    submit: 'Unirme a la red de talento',
    submitting: 'Enviando...',
    confirmation: '[PLACEHOLDER: careers.form.confirmation]',
  },
};
