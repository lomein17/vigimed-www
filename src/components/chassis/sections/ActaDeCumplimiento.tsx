// VM-450 Section 4 Zone B regulatoryDocument variant — the Acta de
// Cumplimiento. Cream document tile on the §4 section background.
// Renders the zoneB.regulatoryDocument fields and, when supplied,
// folds the OPERAMOS BAJO eyebrow + chip rail into the Acta footer
// (Slot Map zoneCEyebrow / zoneCChips). The amber seal is absolute-
// positioned in the top-right of the tile.
//
// Mobile composition: the two-column establecimiento/marco grid
// stacks to a single column; each clause's evidence pill stacks above
// the full-width evidence text. The seal scales down below 480px so
// it doesn't crowd the FOLIO line.

import type { Locale } from '@/lib/i18n';
import type { Chip, Paired, Section4ZoneB } from '@/lib/chassis/slots';

type RegulatoryDocument = Extract<
  Section4ZoneB,
  { kind: 'regulatoryDocument' }
>;

export function ActaDeCumplimiento({
  locale,
  fill,
  marcoEyebrow,
  marcoChips,
}: {
  locale: Locale;
  fill: RegulatoryDocument;
  marcoEyebrow?: Paired<string>;
  marcoChips?: Paired<readonly Chip[]>;
}) {
  return (
    <article className="vm-acta">
      <header className="vm-acta-header">
        <span className="vm-acta-header-title font-ui">
          {fill.actaHeader[locale]}
        </span>
        <span className="vm-acta-header-folio font-mono">
          {fill.folio[locale]}
        </span>
      </header>

      <div className="vm-acta-meta">
        <div className="vm-acta-meta-cell">
          <span className="vm-acta-meta-eyebrow font-ui">ESTABLECIMIENTO</span>
          <span className="vm-acta-meta-value font-body">
            {fill.establecimientoLabel[locale]}
          </span>
        </div>
        <div className="vm-acta-meta-cell">
          <span className="vm-acta-meta-eyebrow font-ui">MARCO NORMATIVO</span>
          <span className="vm-acta-meta-marco font-mono">
            {fill.marcoNormativo[locale]}
          </span>
        </div>
      </div>

      <span
        className="vm-acta-seal font-mono"
        aria-label={fill.sealLabel[locale]}
      >
        {fill.sealLabel[locale]
          .split('/')
          .map((line, i) => (
            <span key={i} className="vm-acta-seal-line">
              {line.trim()}
            </span>
          ))}
      </span>

      <p className="vm-acta-clauses-eyebrow font-ui">
        OBLIGACIÓN Y EVIDENCIA SOSTENIDA
      </p>
      <ol className="vm-acta-clauses">
        {fill.obligationClauses.map((clause, i) => (
          <li key={i} className="vm-acta-clause">
            <p className="vm-acta-clause-text font-body">
              {clause.text[locale]}
            </p>
            <div className="vm-acta-evidence">
              <span className="vm-acta-evidence-pill font-mono">VIGIMED</span>
              <p className="vm-acta-evidence-text font-body">
                {clause.evidence[locale]}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {marcoEyebrow && marcoChips ? (
        <footer className="vm-acta-marco-bar">
          <p className="vm-acta-marco-eyebrow font-ui">
            {marcoEyebrow[locale]}
          </p>
          <ul className="vm-acta-marco-chips">
            {marcoChips[locale].map((chip, i) => (
              <li key={`${i}-${chip}`} className="vm-regulatory-chip">
                {chip}
              </li>
            ))}
          </ul>
        </footer>
      ) : null}
    </article>
  );
}
