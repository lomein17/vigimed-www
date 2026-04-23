import type { Locale, RouteKey } from '@/lib/i18n';

export interface SharedContent {
  nav: {
    primary: Array<{ label: string; route: RouteKey }>;
    drawer: Array<{ label: string; route: RouteKey }>;
    cta: { label: string; route: 'contact' };
  };
  localeSelector: {
    currentLabel: string;
    otherLabel: string;
    otherLocale: Locale;
  };
  footer: { columns: Array<{ heading: string; links: Array<{ label: string; href: string }> }>; copyright: string };
  tagline: string;
  comingSoon: {
    heading: string;
  };
}

export const sharedContent: SharedContent = {
  nav: {
    primary: [
      { label: 'Plataforma', route: 'platform' },
      { label: 'Casos de Uso', route: 'useCases' },
      { label: 'Contacto', route: 'contact' },
    ],
    drawer: [
      { label: 'Inicio', route: 'home' },
      { label: 'Plataforma', route: 'platform' },
      { label: 'Casos de Uso', route: 'useCases' },
      { label: 'Por qué VigiMed', route: 'whyVigimed' },
      { label: 'Cómo Funciona', route: 'howItWorks' },
      { label: 'Contacto', route: 'contact' },
    ],
    cta: { label: 'Solicitar demostración', route: 'contact' },
  },
  localeSelector: {
    currentLabel: 'México',
    otherLabel: 'Estados Unidos',
    otherLocale: 'us-en',
  },
  footer: { columns: [], copyright: '' },
  tagline: 'Cumplimiento que se ve.',
  comingSoon: {
    heading: 'Próximamente',
  },
};
