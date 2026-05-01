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
          { label: 'Hospitales Privados', slug: '/mx-es/hospitales-privados' },
          { label: 'Hospitales Públicos', slug: '/mx-es/hospitales-publicos' },
          { label: 'Sistemas Hospitalarios', slug: '/mx-es/sistemas-hospitalarios' },
          { label: 'Clínicas de Maternidad', slug: '/mx-es/clinicas-de-maternidad' },
          { label: 'Laboratorios Clínicos', slug: '/mx-es/laboratorios-clinicos' },
        ],
      },
      {
        heading: 'Acerca de VigiMed',
        links: [
          { label: 'Newsroom' },
          { label: 'Oportunidades Laborales' },
          { label: 'Contáctanos', slug: '/mx-es#final-cta' },
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
