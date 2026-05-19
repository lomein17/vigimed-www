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
// Layout: flex columns in .vm-faq-grid (UAT r2). At >=1024px the grid
// becomes a flex row with two .vm-faq-column children, each a vertical
// flex column with independent row heights so opening a cell in col A
// does not push col B's cells down.
//
// VM-515 mobile fork (<lg, withStep only): the desktop accordion is
// wrapped `hidden lg:block`; a sibling FaqCarouselMobile renders the
// chip-strip + scroll-snap Q&A carousel below `lg`. The `basic` branch
// (hospitales-publicos) renders the legacy accordion at all widths --
// FaqCarouselMobile is opt-in via the `withStep` discriminator. The
// removed §5.11 mobile-hide rule (`.vm-faq-answer-wrap { display: none }`
// inside `@media (max-width: 1023.98px)`) lives in globals.css and goes
// away in the same commit that lands the carousel.
//
// Keyboard: each cell's trigger is a native button (Enter/Space toggle).
// defaultOpen seeds initial state to the 1-indexed item; 'none' opens
// none. motionStagger ships as a prop but the stagger animation logic
// stays out of this ticket per Pablo D-Pablo-2026-05-11.

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';

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
  // own .vm-faq-column so columns flow independently at >=1024px. With
  // 6 items: colA = items[0..2], colB = items[3..5].
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

  // VM-515: only the withStep branch gets the mobile carousel fork.
  // The `basic` branch keeps the legacy stacked accordion on mobile,
  // matching hospitales-publicos byte-for-byte.
  const allWithStep =
    items.length > 0 && items.every((it) => it.kind === 'withStep');

  return (
    <>
      <div className={allWithStep ? 'hidden lg:block' : undefined}>
        <div className="vm-faq-grid">
          <div className="vm-faq-column">
            {colA.map((item, i) => renderCell(item, i))}
          </div>
          <div className="vm-faq-column">
            {colB.map((item, i) => renderCell(item, half + i))}
          </div>
        </div>
      </div>
      {allWithStep ? (
        <div className="lg:hidden">
          <FaqCarouselMobile
            items={items as readonly FaqItem[]}
            locale={locale}
          />
        </div>
      ) : null}
    </>
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
          <span className="vm-faq-question">{item.question[locale]}</span>
          <span className="vm-faq-preview">{item.preview[locale]}</span>
        </span>
        <span className="vm-faq-toggle" aria-hidden="true">
          <span className="vm-faq-toggle-label">MÁS</span>
          <Chevron />
        </span>
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

// VM-515 mobile fork (<lg, withStep only). Chip-strip + scroll-snap
// carousel of Q&A cards. IntersectionObserver root = .vm-faq-carousel
// keeps chip/dot/counter active state synchronized with the centered
// card; chip-tap and roving-arrow keyboard handler scroll the carousel
// to the matching card. Wiring lifted verbatim from §5.14 ChainMobile
// (threshold + highest-ratio winner) and §5.15 Section2PersonaMatrix
// (roving-arrow shape: Left/Right wrap, Home/End jump, Up/Down no-op,
// meta/ctrl/alt pass through). Honors prefers-reduced-motion: reduce.

const CHIP_STRIP_ARIA_LABEL: Record<Locale, string> = {
  'mx-es': 'Ver pregunta',
  'us-en': '[us-en pending]',
};

const CAROUSEL_ARIA_LABEL: Record<Locale, string> = {
  'mx-es': 'Preguntas frecuentes',
  'us-en': '[us-en pending]',
};

function padded(n: number): string {
  return String(n).padStart(2, '0');
}

function FaqCarouselMobile({
  items,
  locale,
}: {
  items: readonly FaqItem[];
  locale: Locale;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // VM-515 r2: chip strip dedups by step. Unique steps in first-
  // appearance order, each carrying the items[] index of the first
  // card at that step. Cards (dots, counter, scroll-snap) stay on
  // items.length; only the chip strip collapses. Centros-medicos
  // ships two `step: 6` items, so DOCUMENTAR renders once and is
  // active for both cards.
  const chips: {
    item: Extract<FaqItem, { kind: 'withStep' }>;
    firstIdx: number;
  }[] = [];
  items.forEach((it, idx) => {
    if (it.kind !== 'withStep') return;
    if (chips.some((c) => c.item.step === it.step)) return;
    chips.push({ item: it, firstIdx: idx });
  });

  useEffect(() => {
    const root = carouselRef.current;
    if (!root) return;
    const cards = Array.from(
      root.querySelectorAll<HTMLElement>('[data-index]'),
    );
    if (cards.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.intersectionRatio > best.intersectionRatio)
            best = entry;
        }
        if (!best) return;
        const raw = best.target.getAttribute('data-index');
        const idx = raw === null ? NaN : Number(raw);
        if (!Number.isFinite(idx)) return;
        setActiveIdx(idx);
      },
      { root, threshold: [0.55, 0.7, 0.85] },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  function scrollToCard(idx: number) {
    const root = carouselRef.current;
    if (!root) return;
    const target = root.querySelector<HTMLElement>(
      `.vm-faq-card[data-index="${idx}"]`,
    );
    if (!target) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // The -24 cancels scroll-padding-left so the card lands flush at
    // the start of the visual gutter, matching the snap point.
    root.scrollTo({
      left: target.offsetLeft - 24,
      behavior: reduced ? 'instant' : 'smooth',
    });
  }

  function onChipKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (chips.length === 0) return;
    const last = chips.length - 1;
    const activeItem = items[activeIdx];
    const curChipIdx = chips.findIndex(
      (c) =>
        activeItem?.kind === 'withStep' && activeItem.step === c.item.step,
    );
    const cur = curChipIdx === -1 ? 0 : curChipIdx;
    let next: number | null = null;
    if (e.key === 'ArrowLeft') next = cur === 0 ? last : cur - 1;
    if (e.key === 'ArrowRight') next = cur === last ? 0 : cur + 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    const nextChip = chips[next];
    if (!nextChip) return;
    e.preventDefault();
    setActiveIdx(nextChip.firstIdx);
    scrollToCard(nextChip.firstIdx);
    const strip = e.currentTarget.closest<HTMLElement>('[data-faq-strip]');
    strip
      ?.querySelector<HTMLButtonElement>(`[data-chip-idx="${next}"]`)
      ?.focus();
  }

  const total = items.length;
  const activeItem = items[activeIdx];

  return (
    <div className="vm-faq-mobile">
      <div
        role="tablist"
        aria-label={CHIP_STRIP_ARIA_LABEL[locale]}
        data-faq-strip
        className="vm-faq-chipstrip"
      >
        {chips.map((chip, chipIdx) => {
          const isActive =
            activeItem?.kind === 'withStep' &&
            activeItem.step === chip.item.step;
          return (
            <button
              key={`${chip.item.step}-${chipIdx}`}
              type="button"
              role="tab"
              data-chip-idx={chipIdx}
              data-active={isActive ? 'true' : undefined}
              aria-controls={`vm-faq-card-${chip.firstIdx}`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className="vm-faq-chip"
              onClick={() => {
                setActiveIdx(chip.firstIdx);
                scrollToCard(chip.firstIdx);
              }}
              onKeyDown={onChipKeyDown}
            >
              <span className="vm-faq-chip__label">
                {FAQ_STEP_LABELS[chip.item.step][locale]}
              </span>
            </button>
          );
        })}
      </div>

      <div
        ref={carouselRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={CAROUSEL_ARIA_LABEL[locale]}
        className="vm-faq-carousel"
      >
        {items.map((item, i) => {
          if (item.kind !== 'withStep') return null;
          const paragraphs =
            item.mobileAnswer?.[locale] ??
            ([item.preview[locale], item.answer[locale]] as readonly string[]);
          return (
            <article
              key={`${item.question[locale]}-${i}`}
              id={`vm-faq-card-${i}`}
              role="tabpanel"
              data-index={i}
              className="vm-faq-card"
            >
              <header className="vm-faq-card__head">
                <span className="vm-faq-card__step">
                  PASO {item.step} · {FAQ_STEP_LABELS[item.step][locale]}
                </span>
                <span className="vm-faq-card__counter">
                  {padded(i + 1)} / {padded(total)}
                </span>
              </header>
              <h4 className="vm-faq-card__q">{item.question[locale]}</h4>
              <hr className="vm-faq-card__divider" />
              <div className="vm-faq-card__a">
                {paragraphs.map((para, pIdx) => {
                  let cls: string | undefined;
                  if (paragraphs.length === 1) {
                    cls = 'vm-faq-card__a-lead';
                  } else if (pIdx === 0) {
                    cls = 'vm-faq-card__a-lead';
                  } else if (pIdx === paragraphs.length - 1) {
                    cls = 'vm-faq-card__a-accent';
                  }
                  return (
                    <p
                      key={pIdx}
                      className={cls}
                      dangerouslySetInnerHTML={{ __html: para }}
                    />
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>

      <div className="vm-faq-dots">
        {items.map((_, i) => (
          <span
            key={i}
            className="vm-faq-dot"
            data-active={i === activeIdx ? 'true' : undefined}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="vm-faq-count" aria-live="polite">
        <b>{padded(activeIdx + 1)}</b> / {padded(total)}
      </p>
    </div>
  );
}
