// Section 2 -- Operational Reality.
// Slot Map v1.1 §5 / Chassis Brief v1.1 §6.2 (Section 2).
//
// Two-part section: a numbered pressure grid that names the operational
// pressures the segment lives with, then a UC (use-case) strip that
// previews the platform capabilities those pressures map to. Off-white
// background per Chassis Brief §9.1 page rhythm.

import type { Locale } from '@/lib/i18n';
import type { Section2Slots } from '@/lib/chassis/slots';

export function Section2OperationalReality({
  locale,
  fill,
}: {
  locale: Locale;
  fill: Section2Slots;
}) {
  return (
    <section
      id="segment-section-2"
      aria-labelledby="segment-section-2-heading"
      className="vm-segment-section-2"
    >
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        {/* Pressure block header */}
        <div style={{ maxWidth: 820, marginBottom: 48 }}>
          <p
            className="font-ui text-brand-500"
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {fill.eyebrow[locale]}
          </p>
          <h2
            id="segment-section-2-heading"
            className="font-display text-navy-800"
            style={{
              fontSize: 'var(--text-h2)',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              fontWeight: 500,
              color: '#0A1628',
            }}
          >
            {fill.heading[locale]}
          </h2>
        </div>

        {/* Numbered pressure grid: 2 columns desktop, 1 column mobile */}
        <ol className="vm-pressure-grid">
          {fill.pressures.map((pressure, i) => (
            <li key={pressure[locale]} className="vm-pressure-item">
              <span
                className="vm-pressure-number font-display text-brand-500"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p
                className="vm-pressure-text font-body"
                style={{ color: '#0A1628' }}
              >
                {pressure[locale]}
              </p>
            </li>
          ))}
        </ol>

        {/* Divider between pressure grid and UC strip */}
        <hr className="vm-section-2-divider" aria-hidden="true" />

        {/* UC strip header */}
        <div style={{ maxWidth: 820, marginBottom: 32 }}>
          <p
            className="font-ui text-brand-500"
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {fill.ucEyebrow[locale]}
          </p>
          <h3
            className="font-display text-navy-800"
            style={{
              fontSize: 'var(--text-h3)',
              letterSpacing: '-0.005em',
              lineHeight: 1.2,
              fontWeight: 500,
              color: '#0A1628',
            }}
          >
            {fill.ucHeading[locale]}
          </h3>
        </div>

        {/* UC card grid: 3 columns desktop, horizontal scroll mobile */}
        <ul className="vm-uc-grid">
          {fill.ucCards.map((card) => (
            <li key={card.name[locale]} className="vm-uc-card">
              <h4
                className="vm-uc-card-name font-display"
                style={{ color: '#0A1628' }}
              >
                {card.name[locale]}
              </h4>
              <p
                className="vm-uc-card-framing font-body"
                style={{ color: '#2B2B2B' }}
              >
                {card.framing[locale]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
