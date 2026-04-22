export interface SharedContent {
  nav: { items: Array<{ label: string; href: string }> };
  footer: { columns: Array<{ heading: string; links: Array<{ label: string; href: string }> }>; copyright: string };
}

export const sharedContent: SharedContent = {
  nav: { items: [] },
  footer: { columns: [], copyright: '' },
};
