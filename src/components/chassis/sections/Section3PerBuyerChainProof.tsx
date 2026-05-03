'use client';

// Section 3 -- Per-Buyer-Chain Proof.
// Slot Map v1.1 §6 / Chassis Brief v1.1 §6.2 (Section 3) and §5.3.
//
// Discriminated tuple union on tabCount (3 | 4) means the tabs tuple is
// narrowed; the chassis renders whichever shape the segment fixture
// supplies. Desktop renders a tab bar (even distribution per Brief §5.3
// recommendation a) with a single content panel; mobile collapses to an
// accordion. tabDefault selects the initially-active tab on desktop and
// the initially-open accordion item on mobile.
//
// Sub-field render order inside the panel: result, step, quote, regulatory.
// Quote is italic with a brand-amber left border (Brief §6.2 quote
// treatment); the regulatory line is small body in brand-cyan to render
// the brief's "brand-cyan accent" intent against the flat-string slot
// schema (slot-level RichString would let us emphasize specific body
// names; left to a future schema bump if needed).

import { useState } from 'react';

import type { Locale } from '@/lib/i18n';
import type { RoleTab, Section3Slots } from '@/lib/chassis/slots';

export function Section3PerBuyerChainProof({
  locale,
  fill,
}: {
  locale: Locale;
  fill: Section3Slots;
}) {
  const tabsArray: readonly RoleTab[] = fill.tabs;
  const initialIndex = fill.tabDefault - 1;

  return (
    <section
      id="segment-section-3"
      aria-labelledby="segment-section-3-heading"
      className="vm-segment-section-3"
    >
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        {/* Section header */}
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
        </div>

        {/* Desktop: tab bar + single content panel */}
        <DesktopTabs
          tabs={tabsArray}
          initialIndex={initialIndex}
          locale={locale}
        />

        {/* Mobile: accordion */}
        <MobileAccordion
          tabs={tabsArray}
          initialIndex={initialIndex}
          locale={locale}
        />
      </div>
    </section>
  );
}

function DesktopTabs({
  tabs,
  initialIndex,
  locale,
}: {
  tabs: readonly RoleTab[];
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

function MobileAccordion({
  tabs,
  initialIndex,
  locale,
}: {
  tabs: readonly RoleTab[];
  initialIndex: number;
  locale: Locale;
}) {
  return (
    <ul className="vm-section-3-accordion">
      {tabs.map((tab, i) => (
        <AccordionItem
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

function AccordionItem({
  tab,
  locale,
  index,
  defaultOpen,
}: {
  tab: RoleTab;
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

function RoleTabContent({
  tab,
  locale,
}: {
  tab: RoleTab;
  locale: Locale;
}) {
  return (
    <div className="vm-section-3-content">
      <p className="vm-section-3-result">{tab.result[locale]}</p>
      <p className="vm-section-3-step">{tab.step[locale]}</p>
      <blockquote className="vm-section-3-quote">
        {tab.quote[locale]}
      </blockquote>
      <p className="vm-section-3-regulatory">{tab.regulatory[locale]}</p>
    </div>
  );
}
