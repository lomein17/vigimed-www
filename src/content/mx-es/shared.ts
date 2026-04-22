export interface SharedContent {
  nav: { items: Array<{ label: string; href: string }> };
  footer: { columns: Array<{ heading: string; links: Array<{ label: string; href: string }> }>; copyright: string };
  tagline: string;
  comingSoon: {
    heading: string;
    body: string;
    cta: string;
  };
}

export const sharedContent: SharedContent = {
  nav: { items: [] },
  footer: { columns: [], copyright: '' },
  tagline: 'Cumplimiento que se ve.',
  comingSoon: {
    heading: 'Próximamente',
    body: 'En desarrollo. Solicita una demo para ver lo que ya está disponible.',
    cta: 'Volver al inicio',
  },
};
