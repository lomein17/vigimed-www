'use client';

// Section 2 -- Persona x Domain Matrix (VM-447 D-S52-2 variant).
//
// Desktop (>=lg): tab strip over four buyer-chain personas; each tab
// swaps the active persona's 4-card UC set in a 2-col grid. Default
// persona reads from fill.defaultPersona.
//
// Mobile (<lg, VM-514): the same setActive(personaKey) state drives a
// 2x2 pill picker (1x4 in iPhone landscape) above a horizontal scroll-
// snap carousel of UC cards plus a dot row + N/4 counter. An
// IntersectionObserver watches the carousel and pushes the centered
// card's index to activeCard; on persona change the scroll position
// resets to card 0 and the IO disconnect/reconnect cycle re-binds to
// the freshly mounted cards.
//
// The supplement line ("VigiMed Insights ...") is duplicated inside
// each wrapper so each render tree is self-contained.

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  // VM-448 S57 FIX 1: skip the mount invocation so cold load never
  // scrolls; user-initiated tab changes snap the active desktop tab to
  // the strip's left edge via horizontal-only scrollTo. The new mobile
  // picker is a CSS grid (no horizontal scroll), so this effect is a
  // no-op for the mobile pills.
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

  // VM-514: on persona change, reset the mobile UC carousel to card 0
  // and re-observe the freshly mounted cards. behavior: 'instant' (not
  // 'auto') bypasses the html { scroll-behavior: smooth } inheritance
  // per VM-465 lesson.
  useEffect(() => {
    const root = carouselRef.current;
    if (!root) return;
    root.scrollTo({ left: 0, behavior: 'instant' });
    setActiveCard(0);
    const cards = Array.from(
      root.querySelectorAll<HTMLElement>('[data-card-index]'),
    );
    if (cards.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
        if (!best) return;
        const raw = best.target.getAttribute('data-card-index');
        const idx = raw === null ? NaN : Number(raw);
        if (!Number.isFinite(idx)) return;
        setActiveCard(idx);
      },
      { root, threshold: [0.55, 0.7, 0.85] },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [active]);

  // Roving-arrow tablist handler shared by desktop tabs and mobile
  // pills. Left/Right cycle with wrap-around; Home/End jump to ends;
  // Meta/Ctrl/Alt pass through to the browser. Focus follows to the
  // same orientation's matching button via the picker scope.
  function onTabKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const last = PERSONA_ORDER.length - 1;
    const cur = PERSONA_ORDER.indexOf(active);
    if (cur === -1) return;
    let next: number | null = null;
    if (e.key === 'ArrowLeft') next = cur === 0 ? last : cur - 1;
    if (e.key === 'ArrowRight') next = cur === last ? 0 : cur + 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    const nextKey = PERSONA_ORDER[next];
    if (!nextKey) return;
    setActive(nextKey);
    const picker = e.currentTarget.closest<HTMLElement>('[data-picker]');
    picker
      ?.querySelector<HTMLButtonElement>(`[data-persona-key="${nextKey}"]`)
      ?.focus();
  }

  const activeSet = fill.ucByPersona[active];

  return (
    <div className="vm-section-2-persona-matrix">
      {/* Desktop: tab strip + 2-col UC grid + supplement */}
      <div data-picker="desktop" className="hidden lg:block">
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
                data-persona-key={key}
                className="vm-section-2-persona-tab"
                onClick={() => setActive(key)}
                onKeyDown={onTabKeyDown}
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

      {/* Mobile: pill picker + scroll-snap UC carousel + dots/counter + supplement */}
      <div data-picker="mobile" className="lg:hidden">
        <div role="tablist" className="vm-section-2-persona-picker">
          {PERSONA_ORDER.map((key) => {
            const set = fill.ucByPersona[key];
            const isActive = key === active;
            return (
              <button
                key={key}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`vm-section-2-persona-panel-mobile-${key}`}
                id={`vm-section-2-persona-pill-${key}`}
                tabIndex={isActive ? 0 : -1}
                data-active={isActive ? '' : undefined}
                data-persona-key={key}
                className="vm-section-2-persona-pill"
                onClick={() => setActive(key)}
                onKeyDown={onTabKeyDown}
              >
                <span className="vm-section-2-persona-pill-tier">
                  {set.tierLabel[locale]}
                </span>
                <span className="vm-section-2-persona-pill-role">
                  {set.roleLabel[locale]}
                </span>
              </button>
            );
          })}
        </div>

        <div
          ref={carouselRef}
          role="region"
          aria-labelledby={`vm-section-2-persona-pill-${active}`}
          id={`vm-section-2-persona-panel-mobile-${active}`}
          className="vm-section-2-uc-carousel"
        >
          {activeSet.cards.map((card, i) => (
            <article
              key={card.name[locale]}
              className="vm-section-2-uc-card"
              data-card-index={i}
            >
              <h4 className="vm-section-2-uc-card-name font-display">
                {card.name[locale]}
              </h4>
              <p className="vm-section-2-uc-card-framing font-body">
                {card.mobileFraming?.[locale] ?? card.framing[locale]}
              </p>
            </article>
          ))}
        </div>

        <div className="vm-section-2-uc-counter">
          <div className="vm-section-2-uc-dots" role="presentation">
            {activeSet.cards.map((_, i) => (
              <span
                key={i}
                className="vm-section-2-uc-dot"
                data-active={i === activeCard ? '' : undefined}
                aria-hidden="true"
              />
            ))}
          </div>
          <span
            className="vm-section-2-uc-counter-text"
            aria-live="polite"
          >
            {activeCard + 1} / {activeSet.cards.length}
          </span>
        </div>

        <p className="vm-uc-supplement font-body">
          {renderSupplement(fill.ucSupplement[locale])}
        </p>
      </div>
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
