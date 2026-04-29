import type { SharedContent } from '@/content/us-en/shared';

export const sharedContent: SharedContent = {
  localeSelector: {
    currentLabel: 'México',
    otherLabel: 'Estados Unidos',
    otherLocale: 'us-en',
  },
  footer: {
    columns: [
      {
        heading: 'Soluciones',
        links: [
          { label: 'Hospitales Privados' },
          { label: 'Hospitales Públicos' },
          { label: 'Sistemas Hospitalarios' },
          { label: 'Clínicas de Maternidad' },
          { label: 'Laboratorios Clínicos' },
        ],
      },
      {
        heading: 'Acerca de VigiMed',
        links: [
          { label: 'Newsroom' },
          { label: 'Oportunidades Laborales' },
          { label: 'Contactar a VigiMed', route: 'contact' },
        ],
      },
    ],
    copyright: {
      prefix: 'Copyright © 2026 VigiMed.',
      suffix: 'Todos los derechos reservados.',
    },
    legalLinks: [
      { label: 'Política de Privacidad' },
      { label: 'Términos de Uso' },
    ],
  },
  comingSoon: {
    positioning:
      'VigiMed es la plataforma de respuesta a eventos críticos en tiempo real para hospitales.',
    ctaLabel: 'Contáctenos',
    ctaMailtoSubject: 'Solicitud de información',
  },
};
