'use client';

// Section 3 -- Per-Buyer-Chain Proof.
// Slot Map v1.1 §6 / v1.3 §6 + Chassis Brief v1.1 §6.2 / v1.3 §5.3.
//
// Two render branches discriminated on the presence of a top-level
// `chain` block (VM-448 D-S49-3):
//   - Flat branch: legacy single-line tab labels + single content panel,
//     unchanged in behavior. hospitales-publicos.ts is the regression
//     target.
//   - Chain branch: two-line tab labels (responsibility-domain eyebrow
//     above role name, mirroring the §B persona switcher pattern) + a
//     right-rail five-tier chain anchor whose active-tier spotlight is
//     driven by the active tab's `chainTiers`. Closing italic frame
//     line below the rail.
//
// Active-tab state is lifted to the top component so both the desktop
// tab strip and the chain-anchor rail consume the same source of truth.
// On mobile (VM-513) the same state is driven by an IntersectionObserver
// over a scroll-snap carousel; the shared 5-step stepper rendered above
// the carousel reflects the centered card's chainTiers.

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import type { Locale } from '@/lib/i18n';
import {
  CHAIN_TIER_ORDER,
  type ChainAnchor,
  type ChainTierId,
  type RoleTabFlat,
  type RoleTabWithChain,
  type Section3FlatSlots,
  type Section3Slots,
  type Section3WithChainSlots,
} from '@/lib/chassis/slots';
import { RichText } from '../primitives/RichText';

// VM-513 mobile §3 fork. Fixed-string frame line rendered below the
// mobile eyebrow + heading on the chain branch only. Locked per spec:
// no fixture knob, single string per locale; us-en pending.
const SECTION3_MOBILE_FRAME: Record<Locale, string> = {
  'mx-es': 'Cada rol cubre un tramo de la cadena.',
  'us-en': '[us-en pending]',
};

export function Section3PerBuyerChainProof({
  locale,
  fill,
}: {
  locale: Locale;
  fill: Section3Slots;
}) {
  if ('chain' in fill) {
    return <ChainBranch locale={locale} fill={fill} />;
  }
  return <FlatBranch locale={locale} fill={fill} />;
}

// ---------------------------------------------------------------------------
// Section header (shared across both branches)
// ---------------------------------------------------------------------------

function SectionHeader({
  locale,
  fill,
}: {
  locale: Locale;
  fill: Section3Slots;
}) {
  const isChain = 'chain' in fill;
  const headingFrame =
    isChain && fill.headingFrame ? fill.headingFrame[locale] : null;
  // VM-513 mobile fork on the chain branch only. The flat branch
  // (hospitales-publicos) continues to render the legacy composition
  // at all widths.
  const mobileEyebrow = isChain
    ? fill.mobileEyebrow?.[locale] ?? fill.eyebrow[locale]
    : null;
  const mobileHeading = isChain
    ? fill.mobileHeading?.[locale] ?? fill.heading[locale]
    : null;
  return (
    // VM-448 S56 FIX 2: header wrapping div widens at >=1280px to
    // match .vm-section-3-heading-frame so the title does not wrap
    // to four lines while the frame line below it sits wider. Class
    // drives the responsive breakpoint instead of inline style.
    <div className="vm-section-3-header" style={{ marginBottom: 48 }}>
      <div className={isChain ? 'hidden lg:block' : undefined}>
        <p
          className="font-ui text-brand-500"
          style={{
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          {fill.eyebrow[locale]}
        </p>
        <h2
          id="segment-section-3-heading"
          className="font-display text-text-on-dark"
          style={{
            fontSize: 'var(--text-h2)',
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            fontWeight: 500,
            // S56 FIX 2: render explicit \n in heading copy as a line
            // break (e.g. break after "momento.").
            whiteSpace: 'pre-line',
          }}
        >
          {fill.heading[locale]}
        </h2>
        {headingFrame ? (
          <p className="vm-section-3-heading-frame font-body">
            <RichText segments={headingFrame} />
          </p>
        ) : null}
      </div>
      {isChain ? (
        <div className="lg:hidden">
          <p
            className="font-ui text-brand-500"
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {mobileEyebrow}
          </p>
          <h2
            className="font-display text-text-on-dark"
            style={{
              fontSize: 'var(--text-h2)',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              fontWeight: 500,
              whiteSpace: 'pre-line',
            }}
          >
            {mobileHeading}
          </h2>
          <p className="vm-section-3-mobile-frame">
            {SECTION3_MOBILE_FRAME[locale]}
          </p>
        </div>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Flat branch (legacy; unchanged behavior)
// ---------------------------------------------------------------------------

function FlatBranch({
  locale,
  fill,
}: {
  locale: Locale;
  fill: Section3FlatSlots;
}) {
  const tabs: readonly RoleTabFlat[] = fill.tabs;
  const initialIndex = fill.tabDefault - 1;

  return (
    <section
      id="segment-section-3"
      aria-labelledby="segment-section-3-heading"
      className="vm-segment-section-3"
    >
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        <SectionHeader locale={locale} fill={fill} />
        <FlatDesktopTabs
          tabs={tabs}
          initialIndex={initialIndex}
          locale={locale}
        />
        <FlatMobileAccordion
          tabs={tabs}
          initialIndex={initialIndex}
          locale={locale}
        />
      </div>
    </section>
  );
}

function FlatDesktopTabs({
  tabs,
  initialIndex,
  locale,
}: {
  tabs: readonly RoleTabFlat[];
  initialIndex: number;
  locale: Locale;
}) {
  const [active, setActive] = useState(initialIndex);
  const activeTab = tabs[active] ?? tabs[0];
  if (!activeTab) return null;

  return (
    <div className="vm-section-3-desktop">
      <div role="tablist" className="vm-section-3-tabs">
        {tabs.map((tab, i) => {
          const isActive = i === active;
          return (
            <button
              key={tab.label[locale]}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`vm-section-3-panel-${i}`}
              id={`vm-section-3-tab-${i}`}
              tabIndex={isActive ? 0 : -1}
              className="vm-section-3-tab"
              data-active={isActive ? 'true' : undefined}
              onClick={() => setActive(i)}
            >
              {tab.label[locale]}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`vm-section-3-panel-${active}`}
        aria-labelledby={`vm-section-3-tab-${active}`}
        className="vm-section-3-panel"
      >
        <RoleTabContent tab={activeTab} locale={locale} />
      </div>
    </div>
  );
}

function FlatMobileAccordion({
  tabs,
  initialIndex,
  locale,
}: {
  tabs: readonly RoleTabFlat[];
  initialIndex: number;
  locale: Locale;
}) {
  return (
    <ul className="vm-section-3-accordion">
      {tabs.map((tab, i) => (
        <FlatAccordionItem
          key={tab.label[locale]}
          tab={tab}
          locale={locale}
          index={i}
          defaultOpen={i === initialIndex}
        />
      ))}
    </ul>
  );
}

function FlatAccordionItem({
  tab,
  locale,
  index,
  defaultOpen,
}: {
  tab: RoleTabFlat;
  locale: Locale;
  index: number;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const triggerId = `vm-section-3-acc-trigger-${index}`;
  const panelId = `vm-section-3-acc-panel-${index}`;

  return (
    <li className="vm-section-3-acc-item">
      <button
        id={triggerId}
        type="button"
        className="vm-section-3-acc-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((p) => !p)}
      >
        <span className="vm-section-3-acc-label">{tab.label[locale]}</span>
        <span className="vm-section-3-acc-icon" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      {open ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          className="vm-section-3-acc-panel"
        >
          <RoleTabContent tab={tab} locale={locale} />
        </div>
      ) : null}
    </li>
  );
}

// ---------------------------------------------------------------------------
// Chain branch (VM-448 D-S49-3)
// ---------------------------------------------------------------------------

function ChainBranch({
  locale,
  fill,
}: {
  locale: Locale;
  fill: Section3WithChainSlots;
}) {
  const tabs: readonly RoleTabWithChain[] = fill.tabs;
  const initialIndex = fill.tabDefault - 1;

  // Active-tab state is the source of truth shared by the desktop tab
  // strip and the desktop chain rail. Mobile owns its own active-index
  // state because the accordion is an independent input mechanism.
  const [activeDesktop, setActiveDesktop] = useState(initialIndex);
  const [activeMobile, setActiveMobile] = useState(initialIndex);

  const activeDesktopTab = tabs[activeDesktop] ?? tabs[0];
  const activeMobileTab = tabs[activeMobile] ?? tabs[0];
  if (!activeDesktopTab || !activeMobileTab) return null;

  return (
    <section
      id="segment-section-3"
      aria-labelledby="segment-section-3-heading"
      className="vm-segment-section-3"
    >
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        <SectionHeader locale={locale} fill={fill} />

        {/* Desktop: tab bar (full-width) + 60/40 grid (panel + chain rail). */}
        <ChainDesktop
          tabs={tabs}
          active={activeDesktop}
          setActive={setActiveDesktop}
          locale={locale}
          chain={fill.chain}
        />

        {/* Mobile (VM-513): shared stepper above a scroll-snap
            carousel of persona cards. IntersectionObserver inside
            ChainMobile keeps the stepper synchronized with the
            currently centered card. */}
        <ChainMobile
          tabs={tabs}
          activeIndex={activeMobile}
          setActiveIndex={setActiveMobile}
          locale={locale}
          chain={fill.chain}
        />
      </div>
    </section>
  );
}

function ChainDesktop({
  tabs,
  active,
  setActive,
  locale,
  chain,
}: {
  tabs: readonly RoleTabWithChain[];
  active: number;
  setActive: (i: number) => void;
  locale: Locale;
  chain: ChainAnchor;
}) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const isFirstRun = useRef(true);
  const activeTab = tabs[active] ?? tabs[0];

  // VM-448 S56 FIX 1: previously called node.scrollIntoView with
  // block: 'nearest', which scrolled the page vertically on cold load
  // because the active tab sits below §A and §B. Switched to a
  // horizontal-only scroll on the tab strip parent, and skip the first
  // invocation so mount never scrolls (only user-initiated tab
  // switches do).
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

  if (!activeTab) return null;

  return (
    <div className="vm-section-3-desktop">
      <div role="tablist" className="vm-section-3-tabs vm-section-3-tabs-chain">
        {tabs.map((tab, i) => {
          const isActive = i === active;
          return (
            <button
              key={tab.label[locale]}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`vm-section-3-panel-${i}`}
              id={`vm-section-3-tab-${i}`}
              tabIndex={isActive ? 0 : -1}
              className="vm-section-3-tab vm-section-3-tab-chain"
              data-active={isActive ? 'true' : undefined}
              onClick={() => setActive(i)}
            >
              <span className="vm-section-3-tab-tier">
                {tab.tier[locale]}
              </span>
              {tab.headshot ? (
                <Image
                  className="vm-section-3-tab-headshot"
                  src={tab.headshot}
                  alt={tab.label[locale]}
                  width={72}
                  height={72}
                />
              ) : null}
              <span className="vm-section-3-tab-role">
                {tab.label[locale]}
              </span>
            </button>
          );
        })}
      </div>
      <div className="vm-section-3-grid">
        <div
          role="tabpanel"
          id={`vm-section-3-panel-${active}`}
          aria-labelledby={`vm-section-3-tab-${active}`}
          className="vm-section-3-panel vm-section-3-panel-narrow"
        >
          <RoleTabContent tab={activeTab} locale={locale} />
        </div>
        <ChainAnchorRail
          chain={chain}
          activeChainTiers={activeTab.chainTiers}
          locale={locale}
        />
      </div>
    </div>
  );
}

// VM-513: mobile §3 chain branch renders a shared 5-step stepper above
// a horizontal scroll-snap carousel of persona cards. IntersectionObserver
// watches the carousel and pushes the currently centered card's index to
// ChainBranch via setActiveIndex, which in turn re-highlights the
// stepper through the active card's chainTiers. Initial scrollLeft of
// 0 reveals card 1 and fires the observer on mount, so no scroll-into-
// view shim is needed; tabDefault is implicitly 1 on every with-chain
// fixture today.
function ChainMobile({
  tabs,
  activeIndex,
  setActiveIndex,
  locale,
  chain,
}: {
  tabs: readonly RoleTabWithChain[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  locale: Locale;
  chain: ChainAnchor;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const activeTab = tabs[activeIndex] ?? tabs[0];

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
        setActiveIndex(idx);
      },
      { root, threshold: [0.55, 0.7, 0.85] },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [setActiveIndex]);

  if (!activeTab) return null;
  const activeChainTiers = new Set(activeTab.chainTiers);

  return (
    <div className="vm-section-3-mobile-chain">
      <div className="vm-section-3-mobile-stepper">
        {CHAIN_TIER_ORDER.map((tierId) => {
          const isActive = activeChainTiers.has(tierId);
          return (
            <div
              key={tierId}
              className="vm-section-3-mobile-step"
              data-tier={tierId}
              data-active={isActive ? '' : undefined}
            >
              <span
                className="vm-section-3-mobile-step-dot"
                aria-hidden="true"
              />
              <span className="vm-section-3-mobile-step-label">
                {chain.tiers[tierId].label[locale]}
              </span>
            </div>
          );
        })}
      </div>

      <div
        className="vm-section-3-mobile-carousel"
        ref={carouselRef}
        aria-label="Persona chain carousel"
      >
        {tabs.map((tab, i) => {
          const roleLabel = tab.labelMobile?.[locale] ?? tab.label[locale];
          const cardBody = tab.mobileBody?.[locale] ?? tab.body[locale];
          return (
            <article
              key={tab.label[locale]}
              className="vm-section-3-mobile-card"
              data-index={i}
            >
              <div className="vm-section-3-mobile-card-head">
                {tab.headshot ? (
                  <Image
                    className="vm-section-3-mobile-card-port"
                    src={tab.headshot}
                    alt=""
                    width={52}
                    height={52}
                  />
                ) : null}
                <div>
                  <span className="vm-section-3-mobile-card-tier">
                    {tab.tier[locale]}
                  </span>
                  <span className="vm-section-3-mobile-card-role">
                    {roleLabel}
                  </span>
                </div>
              </div>
              <p className="vm-section-3-mobile-card-body">{cardBody}</p>
              <blockquote className="vm-section-3-mobile-card-quote">
                {tab.quote[locale]}
              </blockquote>
              <p className="vm-section-3-mobile-card-reg">
                {tab.regulatory[locale]}
              </p>
            </article>
          );
        })}
      </div>

      <div className="vm-section-3-mobile-dots">
        {tabs.map((_, i) => (
          <span
            key={i}
            className="vm-section-3-mobile-dot"
            data-active={i === activeIndex ? '' : undefined}
            aria-hidden="true"
          />
        ))}
        <span className="vm-section-3-mobile-count">
          {activeIndex + 1} / {tabs.length}
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chain anchor rail (chain branch, both viewports)
// ---------------------------------------------------------------------------

function ChainAnchorRail({
  chain,
  activeChainTiers,
  locale,
}: {
  chain: ChainAnchor;
  activeChainTiers: readonly ChainTierId[];
  locale: Locale;
}) {
  const activeSet = new Set(activeChainTiers);
  return (
    <aside
      className="vm-section-3-chain-rail"
      aria-label="Chain anchor"
    >
      <ol className="vm-section-3-chain-list">
        {CHAIN_TIER_ORDER.map((tierId) => {
          const tier = chain.tiers[tierId];
          const isActive = activeSet.has(tierId);
          return (
            <li
              key={tierId}
              className="vm-section-3-chain-tier"
              data-active={isActive ? 'true' : undefined}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className="vm-section-3-chain-tier-label">
                {tier.label[locale]}
              </span>
              <span className="vm-section-3-chain-tier-description">
                {tier.description[locale]}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="vm-section-3-chain-frame">{chain.frame[locale]}</p>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Shared content panel (works on both flat and chain tab shapes because
// chain tabs extend the flat shape)
// ---------------------------------------------------------------------------

function RoleTabContent({
  tab,
  locale,
}: {
  tab: RoleTabFlat | RoleTabWithChain;
  locale: Locale;
}) {
  // VM-448 S55 FIX 2: chain branch renders single `body` block in place
  // of prior result + step pair. Flat branch keeps result + step.
  const isChain = 'body' in tab;
  const citation =
    'regulatoryCitation' in tab && tab.regulatoryCitation
      ? tab.regulatoryCitation[locale]
      : null;
  return (
    <div className="vm-section-3-content">
      {isChain ? (
        <p className="vm-section-3-body">{tab.body[locale]}</p>
      ) : (
        <>
          <p className="vm-section-3-result">{tab.result[locale]}</p>
          <p className="vm-section-3-step">{tab.step[locale]}</p>
        </>
      )}
      <blockquote className="vm-section-3-quote">
        {tab.quote[locale]}
      </blockquote>
      {citation ? (
        <p className="vm-section-3-citation">{citation}</p>
      ) : null}
      <p className="vm-section-3-regulatory">{tab.regulatory[locale]}</p>
    </div>
  );
}
