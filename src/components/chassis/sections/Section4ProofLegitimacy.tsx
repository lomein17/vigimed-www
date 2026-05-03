// Section 4 -- Proof + Legitimacy block.
// Slot Map v1.1 §7 / Chassis Brief v1.1 §6.2 (Section 4) and §9.1.
//
// Three vertical zones in fixed order:
//   Zone A -- Stat strip (4 metric cells; metric 2 is the em-dash
//             carve-out demonstration when its value is the EM_DASH_GLYPH).
//   Zone B -- PIM scene (contained 16:9 navy frame; renders the navy
//             frame with no <video> element when zoneBVideo.desktop is
//             the empty string, mirroring the Section 1 Hero pattern).
//   Zone C -- Regulatory chip rail.
//
// Off-white background per Chassis Brief §9.1 page rhythm.

import type { Locale } from '@/lib/i18n';
import type { Section4Slots } from '@/lib/chassis/slots';
import { MetricCellValue } from '../primitives/MetricCellValue';

export function Section4ProofLegitimacy({
  locale,
  fill,
}: {
  locale: Locale;
  fill: Section4Slots;
}) {
  return (
    <section
      id="segment-section-4"
      aria-labelledby="segment-section-4-heading"
      className="vm-segment-section-4"
    >
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        {/* Zone A -- Stat strip */}
        <div className="vm-section-4-zone-a">
          <p
            id="segment-section-4-heading"
            className="font-ui text-brand-500"
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {fill.zoneAEyebrow[locale]}
          </p>
          <ul className="vm-stat-strip">
            {fill.zoneAMetrics.map((metric, i) => {
              const m = metric[locale];
              return (
                <li
                  key={`${i}-${m.label}`}
                  className="vm-stat-strip-cell"
                >
                  <div className="vm-stat-strip-value font-display">
                    <MetricCellValue value={m.value} />
                  </div>
                  <div className="vm-stat-strip-label font-ui">
                    {m.label}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Zone B -- PIM scene */}
        <div className="vm-section-4-zone-b">
          <p
            className="font-ui text-brand-500"
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            {fill.zoneBEyebrow[locale]}
          </p>
          <div className="vm-section-4-pim-frame">
            {fill.zoneBVideo.desktop ? (
              <video
                aria-hidden="true"
                autoPlay
                muted
                playsInline
                loop
                preload="metadata"
                poster={fill.zoneBVideo.poster}
                className="vm-section-4-pim-video"
              >
                <source
                  src={fill.zoneBVideo.desktop}
                  type="video/mp4"
                  media="(min-width: 768px)"
                />
                <source src={fill.zoneBVideo.mobile} type="video/mp4" />
              </video>
            ) : null}
          </div>
          <p className="vm-section-4-pim-frame-line font-body">
            {fill.zoneBFrame[locale]}
          </p>
        </div>

        {/* Zone C -- Regulatory chip rail */}
        <div className="vm-section-4-zone-c">
          <p
            className="font-ui text-brand-500"
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            {fill.zoneCEyebrow[locale]}
          </p>
          <ul className="vm-regulatory-chip-rail">
            {fill.zoneCChips[locale].map((chip, i) => (
              <li key={`${i}-${chip}`} className="vm-regulatory-chip">
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
