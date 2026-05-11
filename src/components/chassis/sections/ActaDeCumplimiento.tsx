// VM-450 Section 4 Zone B regulatoryDocument variant — the Acta de
// Cumplimiento. Cream document tile on navy section background.
// Renders eight content fields from the zoneB.regulatoryDocument
// branch: actaHeader, folio, establecimientoLabel, marcoNormativo,
// obligationClauses[], closingLine, sealLabel. Each obligation clause
// carries an inline VIGIMED pill preceding the evidence text.
//
// Mobile composition: the two-column establecimiento/marco grid
// stacks to a single column; each clause's evidence pill stacks above
// the full-width evidence text. The amber seal stays in the lower
// right of the closing row.

import type { Locale } from '@/lib/i18n';
import type { Section4ZoneB } from '@/lib/chassis/slots';

type RegulatoryDocument = Extract<
  Section4ZoneB,
  { kind: 'regulatoryDocument' }
>;

export function ActaDeCumplimiento({
  locale,
  fill,
}: {
  locale: Locale;
  fill: RegulatoryDocument;
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

      <footer className="vm-acta-closing">
        <span className="vm-acta-closing-line font-ui">
          {fill.closingLine[locale]}
        </span>
        <span
          className="vm-acta-seal font-mono"
          aria-label={fill.sealLabel[locale]}
        >
          {fill.sealLabel[locale]
            .split('/')
            .map((line, i, arr) => (
              <span key={i} className="vm-acta-seal-line">
                {line.trim()}
                {i < arr.length - 1 ? null : null}
              </span>
            ))}
        </span>
      </footer>
    </article>
  );
}
