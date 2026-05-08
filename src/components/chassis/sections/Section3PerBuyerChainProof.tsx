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
// On mobile the accordion tracks its own most-recently-toggled-open
// state independently and drives the single chain rail rendered below
// the entire accordion.

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
  const headingFrame =
    'chain' in fill && fill.headingFrame
      ? fill.headingFrame[locale]
      : null;
  return (
    <div style={{ maxWidth: 820, marginBottom: 48 }}>
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

        {/* Mobile: accordion + single chain rail below. */}
        <ChainMobile
          tabs={tabs}
          activeIndex={activeMobile}
          setActiveIndex={setActiveMobile}
          locale={locale}
          chain={fill.chain}
          initialIndex={initialIndex}
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
  const activeTab = tabs[active] ?? tabs[0];

  useEffect(() => {
    const node = tabRefs.current[active];
    if (!node) return;
    node.scrollIntoView({
      inline: 'start',
      block: 'nearest',
      behavior: 'auto',
    });
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
                  width={40}
                  height={40}
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

function ChainMobile({
  tabs,
  activeIndex,
  setActiveIndex,
  locale,
  chain,
  initialIndex,
}: {
  tabs: readonly RoleTabWithChain[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  locale: Locale;
  chain: ChainAnchor;
  initialIndex: number;
}) {
  const activeTab = tabs[activeIndex] ?? tabs[0];
  if (!activeTab) return null;
  return (
    <div className="vm-section-3-mobile-chain">
      <ul className="vm-section-3-accordion">
        {tabs.map((tab, i) => {
          const triggerLabel = tab.labelMobile?.[locale] ?? tab.label[locale];
          return (
            <ChainAccordionItem
              key={tab.label[locale]}
              tab={tab}
              locale={locale}
              index={i}
              triggerLabel={triggerLabel}
              defaultOpen={i === initialIndex}
              onOpen={() => setActiveIndex(i)}
            />
          );
        })}
      </ul>
      <ChainAnchorRail
        chain={chain}
        activeChainTiers={activeTab.chainTiers}
        locale={locale}
      />
    </div>
  );
}

function ChainAccordionItem({
  tab,
  locale,
  index,
  triggerLabel,
  defaultOpen,
  onOpen,
}: {
  tab: RoleTabWithChain;
  locale: Locale;
  index: number;
  triggerLabel: string;
  defaultOpen: boolean;
  onOpen: () => void;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const triggerId = `vm-section-3-acc-trigger-${index}`;
  const panelId = `vm-section-3-acc-panel-${index}`;

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) onOpen();
      return next;
    });
  };

  return (
    <li className="vm-section-3-acc-item">
      <button
        id={triggerId}
        type="button"
        className="vm-section-3-acc-trigger vm-section-3-acc-trigger-chain"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        <span className="vm-section-3-acc-label-stack">
          <span className="vm-section-3-tab-tier">{tab.tier[locale]}</span>
          {tab.headshot ? (
            <Image
              className="vm-section-3-tab-headshot"
              src={tab.headshot}
              alt={tab.label[locale]}
              width={40}
              height={40}
            />
          ) : null}
          <span className="vm-section-3-tab-role">{triggerLabel}</span>
        </span>
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
  const citation =
    'regulatoryCitation' in tab && tab.regulatoryCitation
      ? tab.regulatoryCitation[locale]
      : null;
  return (
    <div className="vm-section-3-content">
      <p className="vm-section-3-result">{tab.result[locale]}</p>
      <p className="vm-section-3-step">{tab.step[locale]}</p>
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
