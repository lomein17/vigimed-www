// Section 2 -- Operational Reality.
// Slot Map v1.1 §5 / Chassis Brief v1.1 §6.2 (Section 2).
//
// Two-variant section per Section2Slots discriminated union (VM-447
// D-S52-2). Flat-UC variant: numbered pressure grid + UC strip header +
// UC card grid. Persona-matrix variant: optional pressure grid (skipped
// when empty/absent) + persona switcher + persona-scoped UC card grid +
// supplement line. Off-white background per Brief §9.1.

import type { Locale } from '@/lib/i18n';
import type { Section2Slots } from '@/lib/chassis/slots';
import { Section2PersonaMatrix } from './Section2PersonaMatrix';

export function Section2OperationalReality({
  locale,
  fill,
}: {
  locale: Locale;
  fill: Section2Slots;
}) {
  const isPersonaMatrix = 'ucByPersona' in fill;
  const pressures = fill.pressures;
  const hasPressureBlock = !!pressures && pressures.length > 0;
  const showDivider = hasPressureBlock && !isPersonaMatrix;

  return (
    <section
      id="segment-section-2"
      aria-labelledby="segment-section-2-heading"
      className="vm-segment-section-2"
    >
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        {/* Section header */}
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
              whiteSpace: 'pre-line',
            }}
          >
            {fill.heading[locale]}
          </h2>
        </div>

        {/* Numbered pressure grid (flat-UC always, persona-matrix only
            when fixture supplies non-empty pressures) */}
        {hasPressureBlock && pressures ? (
          <ol className="vm-pressure-grid">
            {pressures.map((pressure, i) => (
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
        ) : null}

        {/* Divider only renders for the flat-UC variant when both
            blocks are visible. Persona-matrix opens directly on the
            tab strip per spec. */}
        {showDivider ? (
          <hr className="vm-section-2-divider" aria-hidden="true" />
        ) : null}

        {isPersonaMatrix ? (
          <Section2PersonaMatrix locale={locale} fill={fill} />
        ) : (
          <FlatUcStrip locale={locale} fill={fill} />
        )}
      </div>
    </section>
  );
}

function FlatUcStrip({
  locale,
  fill,
}: {
  locale: Locale;
  fill: Extract<Section2Slots, { ucCards: readonly unknown[] }>;
}) {
  return (
    <>
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
    </>
  );
}
