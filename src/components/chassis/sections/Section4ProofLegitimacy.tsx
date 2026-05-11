// Section 4 -- Proof + Legitimacy block.
// Slot Map v1.1 §7 / Chassis Brief v1.1 §6.2 (Section 4) and §9.1.
//
// VM-450 D-S56-2: Section 4 now switches on fill.theme and on each
// zone's discriminated-union kind to render either the legacy off-
// white / metricStrip / video composition or the Centros Médicos §D
// navy / obligationGrid / regulatoryDocument composition. The default
// off-white render is preserved verbatim for hospitales-publicos.
//
// Three vertical zones in fixed order:
//   Zone A -- metricStrip (stat strip with em-dash carve-out) OR
//             obligationGrid (4 regulatory-obligation cards).
//   Zone B -- video (PIM scene in a contained 16:9 navy frame; empty
//             desktop src renders the navy frame with no <video>
//             element, mirroring the Section 1 Hero pattern) OR
//             regulatoryDocument (the Acta de Cumplimiento tile).
//   Zone C -- Regulatory chip rail (always rendered; chip styling
//             flips on theme).
//
// When fill.header is supplied, a section-level header (eyebrow +
// 2-line heading + frame) renders above Zone A; segments that omit
// fill.header render Section 4 with no top-level header.

import type { Locale } from '@/lib/i18n';
import type { Section4Slots } from '@/lib/chassis/slots';
import { MetricCellValue } from '../primitives/MetricCellValue';
import { Section4Header } from './Section4Header';
import { ObligationCardGrid } from './ObligationCardGrid';
import { ActaDeCumplimiento } from './ActaDeCumplimiento';

export function Section4ProofLegitimacy({
  locale,
  fill,
}: {
  locale: Locale;
  fill: Section4Slots;
}) {
  // VM-450 UAT r2: regulatoryDocument variant gets a compressed
  // vertical rhythm (tighter top/bottom padding, smaller Zone gaps)
  // so the whole §D fits inside a single 1440x900 desktop viewport.
  // The modifier is keyed off zoneB.kind, not theme, so a future
  // navy + regulatoryDocument combination still picks up the
  // compression while metricStrip + video segments keep the
  // var(--site-section) rhythm intact.
  const classes = ['vm-segment-section-4'];
  if (fill.theme === 'navy') {
    classes.push('vm-segment-section-4--theme-navy');
  }
  if (fill.zoneB.kind === 'regulatoryDocument') {
    classes.push('vm-segment-section-4--variant-regulatory-document');
  }
  const themeClass = classes.join(' ');

  return (
    <section
      id="segment-section-4"
      aria-labelledby="segment-section-4-heading"
      className={themeClass}
    >
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        {fill.header ? (
          <Section4Header locale={locale} fill={fill.header} />
        ) : null}

        {/* Zone A -- metricStrip or obligationGrid */}
        <div className="vm-section-4-zone-a">
          {fill.zoneA.kind === 'metricStrip' ? (
            <>
              <p
                id={
                  fill.header
                    ? 'segment-section-4-zone-a-eyebrow'
                    : 'segment-section-4-heading'
                }
                className="vm-section-4-zone-a-eyebrow font-ui text-brand-500"
              >
                {fill.zoneA.eyebrow[locale]}
              </p>
              <ul className="vm-stat-strip">
                {fill.zoneA.metrics.map((metric, i) => {
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
            </>
          ) : (
            <ObligationCardGrid locale={locale} cards={fill.zoneA.cards} />
          )}
        </div>

        {/* Zone B -- video PIM scene or regulatoryDocument acta */}
        <div className="vm-section-4-zone-b">
          {fill.zoneB.kind === 'video' ? (
            <>
              <p className="vm-section-4-zone-b-eyebrow font-ui text-brand-500">
                {fill.zoneB.eyebrow[locale]}
              </p>
              <div className="vm-section-4-pim-frame">
                {fill.zoneB.video.desktop ? (
                  <video
                    aria-hidden="true"
                    autoPlay
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    poster={fill.zoneB.video.poster}
                    className="vm-section-4-pim-video"
                  >
                    <source
                      src={fill.zoneB.video.desktop}
                      type="video/mp4"
                      media="(min-width: 768px)"
                    />
                    <source
                      src={fill.zoneB.video.mobile}
                      type="video/mp4"
                    />
                  </video>
                ) : null}
              </div>
              <p className="vm-section-4-pim-frame-line font-body">
                {fill.zoneB.frame[locale]}
              </p>
            </>
          ) : (
            <ActaDeCumplimiento locale={locale} fill={fill.zoneB} />
          )}
        </div>

        {/* Zone C -- Regulatory chip rail */}
        <div className="vm-section-4-zone-c">
          <p className="vm-section-4-zone-c-eyebrow font-ui text-brand-500">
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
