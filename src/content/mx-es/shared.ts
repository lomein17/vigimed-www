import type { SharedContent } from '@/content/us-en/shared';

export const sharedContent: SharedContent = {
  nav: {
    marketSegments: [
      { label: 'Hospitales', route: 'platform', icon: 'hospital' },
      { label: 'Clínicas', route: 'platform', icon: 'clinic' },
      { label: 'Laboratorios', route: 'platform', icon: 'lab' },
    ],
    contactCta: { label: 'Contáctenos', route: 'contact' },
    demoCta: { label: 'Agende una demo', route: 'contact' },
    drawer: [
      { label: 'Inicio', route: 'home' },
      { label: 'Plataforma', route: 'platform' },
      { label: 'Casos de Uso', route: 'useCases' },
      { label: 'Por qué VigiMed', route: 'whyVigimed' },
      { label: 'Cómo Funciona', route: 'howItWorks' },
      { label: 'Contacto', route: 'contact' },
    ],
  },
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
          { label: 'Hospitales Públicos' },
          { label: 'Hospitales Privados' },
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
