// VM-450 Section 4 Zone A obligation grid (Centros Médicos §D
// regulatoryDocument theme). Four obligation cards rendered as a
// 4-column grid at >=768px and 2 columns below. Each card: dark-navy
// tile, brand-cyan 2px top accent, monospaced article anchor (cyan),
// body label, small-caps frequency tag.

import type { Locale } from '@/lib/i18n';
import type { ObligationCard } from '@/lib/chassis/slots';

export function ObligationCardGrid({
  locale,
  cards,
}: {
  locale: Locale;
  cards: readonly [
    ObligationCard,
    ObligationCard,
    ObligationCard,
    ObligationCard,
  ];
}) {
  return (
    <ul className="vm-section-4-obligation-grid">
      {cards.map((card, i) => (
        <li
          key={`${i}-${card.articleAnchor[locale]}`}
          className="vm-section-4-obligation-card"
        >
          <span className="vm-section-4-obligation-anchor font-mono">
            {card.articleAnchor[locale]}
          </span>
          <span className="vm-section-4-obligation-label font-body">
            {card.label[locale]}
          </span>
          <span className="vm-section-4-obligation-frequency font-ui">
            {card.frequency[locale]}
          </span>
        </li>
      ))}
    </ul>
  );
}
