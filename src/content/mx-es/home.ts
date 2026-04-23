export interface HomeContent {
  hero: { eyebrow: string; headline: string; subhead: string; cta: string };
  problem: { cards: Array<{ stat: string; label: string; icon: string }> };
  solution: { cards: Array<{ title: string; body: string }> };
}

export const homeContent: HomeContent = {
  hero: { eyebrow: '', headline: '', subhead: '', cta: '' },
  problem: { cards: [] },
  solution: { cards: [] },
};
