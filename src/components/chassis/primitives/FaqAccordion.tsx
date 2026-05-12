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
// Layout: CSS grid in .vm-faq-grid. Single column below 1024px, 1fr 1fr
// at >=1024px with align-items: start so adjacent cells in the same row
// stay at rest height when one expands (independent accordions).
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
  return (
    <div className="vm-faq-grid">
      {items.map((item, i) => (
        <FaqAccordionItem
          key={`${item.kind}-${item.question[locale]}`}
          item={item}
          locale={locale}
          index={i}
          initiallyOpen={defaultOpen !== 'none' && defaultOpen - 1 === i}
        />
      ))}
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
