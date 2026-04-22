export interface PlatformContent {
  hero: { eyebrow: string; headline: string; subhead: string };
  features: Array<{ title: string; body: string; icon: string }>;
  cta: { headline: string; body: string; button: string };
}

export const platformContent: PlatformContent = {
  hero: { eyebrow: '', headline: '', subhead: '' },
  features: [],
  cta: { headline: '', body: '', button: '' },
};
