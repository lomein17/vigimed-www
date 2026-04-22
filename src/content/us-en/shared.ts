export interface SharedContent {
  nav: { items: Array<{ label: string; href: string }> };
  footer: { columns: Array<{ heading: string; links: Array<{ label: string; href: string }> }>; copyright: string };
  tagline: string;
  comingSoon: {
    heading: string;
  };
}

export const sharedContent: SharedContent = {
  nav: { items: [] },
  footer: { columns: [], copyright: '' },
  tagline: 'Compliance you can see.',
  comingSoon: {
    heading: 'Coming Soon',
  },
};
