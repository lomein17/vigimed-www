export type HomeIconKey =
  | 'ClipboardList'
  | 'Eye'
  | 'Clock'
  | 'DollarSign'
  | 'Video'
  | 'LayoutGrid'
  | 'ShieldCheck'
  | 'FileText';

export interface HomeContent {
  hero: { eyebrow: string; headline: string; subhead: string; cta: string };
  problem: { cards: Array<{ stat: string; label: string; icon: HomeIconKey }> };
  solution: { cards: Array<{ title: string; body: string; icon: HomeIconKey }> };
}

export const homeContent: HomeContent = {
  hero: {
    eyebrow: 'HOSPITAL COMPLIANCE MONITORING',
    headline: 'Compliance you can see.',
    subhead:
      'Continuous video-based monitoring, human-verified, mapped to your regulatory obligations. No rounds. No checklists. No blind spots.',
    cta: 'Request a demo',
  },
  problem: {
    cards: [
      { stat: '5%', label: 'of events captured by manual audits', icon: 'ClipboardList' },
      { stat: '$3-6M', label: 'annual Medicare revenue at risk per 200-bed hospital', icon: 'DollarSign' },
      { stat: '44%', label: 'Hawthorne effect inflation in manual observation', icon: 'Eye' },
    ],
  },
  solution: {
    cards: [
      { title: '24/7 Monitoring', body: 'Continuous camera-based compliance observation.', icon: 'Video' },
      { title: '17 Use Cases', body: 'From sterile field breaches to staffing ratios.', icon: 'LayoutGrid' },
      { title: 'Compliance Review Center', body: 'Every alert verified by a human analyst before it escalates.', icon: 'ShieldCheck' },
      { title: 'Evidence-Grade Reports', body: 'Video-linked documentation for audits and investigations.', icon: 'FileText' },
    ],
  },
};
