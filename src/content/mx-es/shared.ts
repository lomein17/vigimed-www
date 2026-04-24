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
        heading: 'Plataforma',
        links: [
          { label: 'Inicio', route: 'home' },
          { label: 'Plataforma', route: 'platform' },
          { label: 'Casos de Uso', route: 'useCases' },
          { label: 'Por qué VigiMed', route: 'whyVigimed' },
          { label: 'Cómo Funciona', route: 'howItWorks' },
          { label: 'Contacto', route: 'contact' },
        ],
      },
      {
        heading: 'Empresa',
        links: [{ label: 'Contacto', route: 'contact' }],
      },
      {
        heading: 'Contacto',
        links: [
          { label: 'contacto@vigimed.ai', href: 'mailto:contacto@vigimed.ai' },
        ],
      },
    ],
    copyright: '© VigiMed 2026',
    privacyLabel: 'Política de Privacidad',
  },
  comingSoon: {
    positioning:
      'VigiMed es la plataforma de respuesta a eventos críticos en tiempo real para hospitales.',
    ctaLabel: 'Contáctenos',
    ctaMailtoSubject: 'Solicitud de información',
  },
};
