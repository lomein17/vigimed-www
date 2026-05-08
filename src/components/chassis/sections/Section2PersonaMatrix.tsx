'use client';

// Section 2 -- Persona x Domain Matrix (VM-447 D-S52-2 variant).
//
// Tab strip over four buyer-chain personas; each tab swaps the active
// persona's 4-card UC set in place, with no page navigation. Default
// persona reads from fill.defaultPersona. Below the grid, a supplement
// line names the catalog breadth and VigiMed Insights, with the
// "VigiMed Insights" substring rendered with the supplement-mark
// treatment.
//
// Mobile: the tab strip is a horizontal scroller with scroll snap; on
// initial render and on every persona change, the active tab is
// scrolled to the strip's left edge so users always see it as the
// anchor.

import { useEffect, useRef, useState } from 'react';

import type { Locale } from '@/lib/i18n';
import type {
  PersonaKey,
  Section2PersonaMatrixSlots,
} from '@/lib/chassis/slots';

const PERSONA_ORDER: readonly PersonaKey[] = [
  'jefeUveh',
  'calidad',
  'medica',
  'general',
];

const SUPPLEMENT_MARK = 'VigiMed Insights';

export function Section2PersonaMatrix({
  locale,
  fill,
}: {
  locale: Locale;
  fill: Section2PersonaMatrixSlots;
}) {
  const [active, setActive] = useState<PersonaKey>(fill.defaultPersona);
  const tabRefs = useRef<Record<PersonaKey, HTMLButtonElement | null>>({
    jefeUveh: null,
    calidad: null,
    medica: null,
    general: null,
  });
  const isFirstRun = useRef(true);

  // VM-448 S57 FIX 1: previously called node.scrollIntoView on every
  // mount/active change. With block: 'nearest', cold load (when §B sits
  // below the fold) still scrolled the page vertically to bring the
  // active tab into view, landing the user near §B instead of §A. Mirror
  // the S56 §C fix: skip the first invocation so mount never scrolls,
  // and use horizontal-only scrollTo on the tab strip parent so
  // user-initiated tab changes still snap the active tab to the strip's
  // left edge without touching the page's vertical scroll.
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const node = tabRefs.current[active];
    if (!node || !node.parentElement) return;
    const parent = node.parentElement;
    const offsetLeft = node.offsetLeft - parent.offsetLeft;
    parent.scrollTo({ left: offsetLeft, behavior: 'auto' });
  }, [active]);

  const activeSet = fill.ucByPersona[active];

  return (
    <div className="vm-section-2-persona-matrix">
      <div role="tablist" className="vm-section-2-persona-tabs">
        {PERSONA_ORDER.map((key) => {
          const set = fill.ucByPersona[key];
          const isActive = key === active;
          return (
            <button
              key={key}
              ref={(node) => {
                tabRefs.current[key] = node;
              }}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`vm-section-2-persona-panel-${key}`}
              id={`vm-section-2-persona-tab-${key}`}
              tabIndex={isActive ? 0 : -1}
              data-active={isActive ? 'true' : undefined}
              className="vm-section-2-persona-tab"
              onClick={() => setActive(key)}
            >
              <span className="vm-section-2-persona-tab-role">
                {set.roleLabel[locale]}
              </span>
              <span className="vm-section-2-persona-tab-tier">
                {set.tierLabel[locale]}
              </span>
            </button>
          );
        })}
      </div>

      <ul
        role="tabpanel"
        id={`vm-section-2-persona-panel-${active}`}
        aria-labelledby={`vm-section-2-persona-tab-${active}`}
        className="vm-uc-persona-grid"
      >
        {activeSet.cards.map((card) => (
          <li key={card.name[locale]} className="vm-uc-persona-card">
            <h4 className="vm-uc-persona-card-name font-display">
              {card.name[locale]}
            </h4>
            <p className="vm-uc-persona-card-framing font-body">
              {card.framing[locale]}
            </p>
          </li>
        ))}
      </ul>

      <p className="vm-uc-supplement font-body">
        {renderSupplement(fill.ucSupplement[locale])}
      </p>
    </div>
  );
}

function renderSupplement(text: string) {
  const parts = text.split(SUPPLEMENT_MARK);
  if (parts.length < 2) return text;
  const result: React.ReactNode[] = [];
  parts.forEach((part, i) => {
    if (i > 0) {
      result.push(
        <span
          key={`mark-${i}`}
          className="vm-uc-supplement-mark"
        >
          {SUPPLEMENT_MARK}
        </span>,
      );
    }
    result.push(<span key={`txt-${i}`}>{part}</span>);
  });
  return result;
}
