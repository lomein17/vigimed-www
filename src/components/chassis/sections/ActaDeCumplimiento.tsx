'use client';

// VM-450 Section 4 Zone B regulatoryDocument variant — the Acta de
// Cumplimiento. Cream document tile on the §4 section background.
// Renders the zoneB.regulatoryDocument fields and, when supplied,
// folds the OPERAMOS BAJO eyebrow + chip rail into the Acta footer
// (Slot Map zoneCEyebrow / zoneCChips). The amber seal is absolute-
// positioned in the top-right of the tile.
//
// Mobile (<1024px) forks to a collapsible-clauses layout (VM-516):
// each clause renders as a row with a numbered prefix and chevron,
// and tapping reveals a centered evidence pill + text. Desktop
// (>=1024px) keeps the original 2-col always-expanded grid.

import { useState } from 'react';

import type { Locale } from '@/lib/i18n';
import type { Chip, Paired, Section4ZoneB } from '@/lib/chassis/slots';

type RegulatoryDocument = Extract<
  Section4ZoneB,
  { kind: 'regulatoryDocument' }
>;

function ActaClauseMobile({
  clause,
  index,
  locale,
}: {
  clause: RegulatoryDocument['obligationClauses'][number];
  index: number;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const i = String(index + 1).padStart(2, '0');
  return (
    <li
      className="vm-acta-clause-mobile"
      data-open={open ? '' : undefined}
    >
      <button
        type="button"
        className="vm-acta-clause-trigger"
        aria-expanded={open}
        aria-controls={`vm-acta-clause-body-${index}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="vm-acta-clause-num font-mono">{i}</span>
        <p className="vm-acta-clause-text font-body">
          {clause.text[locale]}
        </p>
        <svg
          className="vm-acta-clause-chevron"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className="vm-acta-clause-body"
        id={`vm-acta-clause-body-${index}`}
      >
        <div className="vm-acta-clause-body-inner">
          <div className="vm-acta-evidence-mobile">
            <span className="vm-acta-evidence-pill font-mono">
              VIGIMED
            </span>
            <p className="vm-acta-evidence-text font-body">
              {clause.evidence[locale]}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

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
      {/* Desktop: existing 2-col grid (byte-for-byte unchanged) */}
      <ol className="vm-acta-clauses hidden lg:grid">
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
      {/* Mobile: collapsible stack (VM-516) */}
      <ol className="vm-acta-clauses-mobile lg:hidden">
        {fill.obligationClauses.map((clause, i) => (
          <ActaClauseMobile
            key={i}
            clause={clause}
            index={i}
            locale={locale}
          />
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
