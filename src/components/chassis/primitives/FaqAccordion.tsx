'use client';

// FAQ accordion primitive for Section 5 Zone A.
// Slot Map v1.1 §8.2 / Chassis Brief v1.1 §8 Zone A.
//
// Each item is independently expandable. Closed by default. Keyboard:
// the trigger is a native button so Enter and Space toggle out of the
// box. Animation is a snap-open: the chassis brief does not specify a
// height transition and the surface is short, so we keep the open/close
// instant rather than introducing a measure-and-animate dance.

import { useState } from 'react';

import type { FaqItem } from '@/lib/chassis/slots';
import type { Locale } from '@/lib/i18n';

export function FaqAccordion({
  items,
  locale,
}: {
  items: readonly FaqItem[];
  locale: Locale;
}) {
  return (
    <ul className="vm-faq-list">
      {items.map((item, i) => (
        <FaqAccordionItem
          key={item.question[locale]}
          item={item}
          locale={locale}
          index={i}
        />
      ))}
    </ul>
  );
}

function FaqAccordionItem({
  item,
  locale,
  index,
}: {
  item: FaqItem;
  locale: Locale;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const triggerId = `vm-faq-trigger-${index}`;
  const panelId = `vm-faq-panel-${index}`;

  return (
    <li className="vm-faq-item">
      <button
        id={triggerId}
        type="button"
        className="vm-faq-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="vm-faq-question">{item.question[locale]}</span>
        <span className="vm-faq-icon" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      {open ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          className="vm-faq-panel"
        >
          <p className="vm-faq-answer">{item.answer[locale]}</p>
        </div>
      ) : null}
    </li>
  );
}
