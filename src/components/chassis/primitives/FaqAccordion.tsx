'use client';

// FAQ accordion primitive for Section 5 Zone A.
// Slot Map v1.6 §8.2 / Chassis Brief v1.6 §8 Zone A (VM-451; UAT r1).
//
// Two render branches discriminated on FaqItem.kind:
//   - 'basic'    minimal Q + chevron + expanding answer (legacy
//                hospitales-publicos surface).
//   - 'withStep' Pattern 2 inline-expand. 3px cyan left rail; PASO N ·
//                LABEL strip rendered above the question (not absolute
//                left of it, per UAT r1); amber question, white preview
//                always visible; brand-amber chevron (cyan when open)
//                with 90deg rotation; answer expands via
//                grid-template-rows 0fr -> 1fr.
//
// Layout: flex columns in .vm-faq-grid (UAT r2). Mobile collapses to a
// single column via `display: contents` on .vm-faq-column so items flow
// in source order 1-6. At >=1024px the grid becomes a flex row with two
// .vm-faq-column children, each a vertical flex column with independent
// row heights so opening a cell in col A does not push col B's cells
// down. Replaces the prior CSS grid, where row heights were the max of
// each row's cells and asymmetric expansion left dead whitespace.
//
// Keyboard: each cell's trigger is a native button (Enter/Space toggle).
// defaultOpen seeds initial state to the 1-indexed item; 'none' opens
// none. motionStagger ships as a prop but the stagger animation logic
// stays out of this ticket per Pablo D-Pablo-2026-05-11.

import { useState } from 'react';

import { FAQ_STEP_LABELS } from '@/lib/chassis/constants';
import type { FaqItem } from '@/lib/chassis/slots';
import type { Locale } from '@/lib/i18n';

export function FaqAccordion(props: {
  items: readonly FaqItem[];
  locale: Locale;
  defaultOpen: 'none' | 1 | 2 | 3 | 4 | 5 | 6;
  motionStagger?: boolean;
}) {
  const { items, locale, defaultOpen } = props;
  // TODO VM-451 follow-on: stagger animation logic, default off per
  // Pablo D-Pablo-2026-05-11. Prop wired through the type signature so
  // Section5 fills it from fill.faqMotionStagger without an interim
  // chassis bump; no current consumer until the follow-on patch lands.
  void props.motionStagger;
  // UAT r2: split items into two halves and render each half inside its
  // own .vm-faq-column so columns flow independently at >=1024px. Mobile
  // collapses both columns to source order via `display: contents` in
  // CSS. With 6 items: colA = items[0..2], colB = items[3..5].
  const half = Math.ceil(items.length / 2);
  const colA = items.slice(0, half);
  const colB = items.slice(half);
  const renderCell = (item: FaqItem, globalIndex: number) => (
    <FaqAccordionItem
      key={`${item.kind}-${item.question[locale]}`}
      item={item}
      locale={locale}
      index={globalIndex}
      initiallyOpen={defaultOpen !== 'none' && defaultOpen - 1 === globalIndex}
    />
  );
  return (
    <div className="vm-faq-grid">
      <div className="vm-faq-column">
        {colA.map((item, i) => renderCell(item, i))}
      </div>
      <div className="vm-faq-column">
        {colB.map((item, i) => renderCell(item, half + i))}
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <svg
      className="vm-faq-chevron"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden="true"
    >
      <path
        d="M3 1 L9 6 L3 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FaqAccordionItem({
  item,
  locale,
  index,
  initiallyOpen,
}: {
  item: FaqItem;
  locale: Locale;
  index: number;
  initiallyOpen: boolean;
}) {
  const [open, setOpen] = useState(initiallyOpen);
  const triggerId = `vm-faq-trigger-${index}`;
  const panelId = `vm-faq-panel-${index}`;

  if (item.kind === 'basic') {
    return (
      <div className="vm-faq-cell" data-kind="basic" data-open={open}>
        <button
          id={triggerId}
          type="button"
          className="vm-faq-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="vm-faq-content">
            <span className="vm-faq-question">{item.question[locale]}</span>
          </span>
          <Chevron />
        </button>
        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          className="vm-faq-answer-wrap"
          data-open={open}
        >
          <div className="vm-faq-answer-inner">
            <p className="vm-faq-answer">{item.answer[locale]}</p>
          </div>
        </div>
      </div>
    );
  }

  const stepLabel = FAQ_STEP_LABELS[item.step][locale];

  return (
    <div className="vm-faq-cell" data-kind="withStep" data-open={open}>
      <span className="vm-faq-rail" aria-hidden="true" />
      <button
        id={triggerId}
        type="button"
        className="vm-faq-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="vm-faq-content">
          <span className="vm-faq-step" aria-hidden="true">
            {`PASO ${item.step} · ${stepLabel}`}
          </span>
          <span className="vm-faq-question">{item.question[locale]}</span>
          <span className="vm-faq-preview">{item.preview[locale]}</span>
        </span>
        <Chevron />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="vm-faq-answer-wrap"
        data-open={open}
      >
        <div className="vm-faq-answer-inner">
          <p className="vm-faq-answer">{item.answer[locale]}</p>
        </div>
      </div>
    </div>
  );
}
