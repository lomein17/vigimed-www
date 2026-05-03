// Typed-slot schema for the universal segment-page chassis.
// Authority: Slot Map v1.1 (slug 9fb768019127), Chassis Design Brief v1.1
// (slug 7c5e7054002b). All 53 slots represented; chassis-constant slots
// (CTA labels, render triggers) are intentionally absent from the fill
// interfaces and live in constants.ts.

import type { Locale } from '@/lib/i18n';

// ---------------------------------------------------------------------------
// Locale handling primitives (Slot Map v1.1 §locale handling)
// ---------------------------------------------------------------------------

// Slot-level locale parity contract. Every paired slot carries both locale
// values; the rendering component picks slot[locale] at render time.
export type Paired<T> = Record<Locale, T>;

// Semantic alias for slots the Slot Map marks Locale-agnostic.
export type LocaleAgnostic<T> = T;

// ---------------------------------------------------------------------------
// Content type vocabulary (Slot Map v1.1 §3)
// ---------------------------------------------------------------------------

export type EmphasisKind = 'bold-amber' | 'brand-cyan';

export interface RichSegment {
  readonly text: string;
  readonly emphasis?: EmphasisKind;
}

// Slot Map v1.1 §3 richString: single-line text with inline emphasis spans
export type RichString = readonly RichSegment[];

// Slot Map v1.1 §3 richParagraph: body text with inline emphasis spans
export type RichParagraph = readonly RichSegment[];

// Slot Map v1.1 §3 paragraph: multi-sentence body text
export type Paragraph = string;

// Slot Map v1.1 §3 metricCell: value + label pair for stat/metric strips
export interface MetricCell {
  readonly value: string;
  readonly label: string;
}

// Slot Map v1.1 §3 chip: small label rendered as chip/pill
export type Chip = string;

// Slot Map v1.1 §3 faqItem: question + answer composite
export interface FaqItem {
  readonly question: Paired<string>;
  readonly answer: Paired<string>;
}

// Slot Map v1.1 §3 video: looping video asset bed
export interface Video {
  readonly desktop: string;
  readonly mobile: string;
  readonly poster: string;
}

// Slot Map v1.1 §6.2: composite per buyer-chain role (Section 3).
// Each field is Paired per Slot Map locale handling.
export interface RoleTab {
  readonly label: Paired<string>;
  readonly result: Paired<string>;
  readonly step: Paired<string>;
  readonly quote: Paired<string>;
  readonly regulatory: Paired<string>;
}

// ---------------------------------------------------------------------------
// Section slot interfaces
// ---------------------------------------------------------------------------

// Slot Map v1.1 §4.2 S1.cta.secondary.target
export type SecondaryCtaTarget =
  | 'section3.tab.default'
  | 'section4.zoneB'
  | 'none';

// Slot Map v1.1 §4 -- Section 1 Hero (12 slots)
// S1.cta.primary.label is a chassis constant (D-S25-1); intentionally
// absent. Read from CONVERSION_CTA_LABELS at render time.
export interface HeroSlots {
  // Slot Map v1.1 §4.2 S1.context.bar
  readonly contextBar: Paired<string>;
  // Slot Map v1.1 §4.2 S1.eyebrow
  readonly eyebrow: Paired<string>;
  // Slot Map v1.1 §4.2 S1.h1.line1
  readonly h1Line1: Paired<RichString>;
  // Slot Map v1.1 §4.2 S1.h1.line2
  readonly h1Line2: Paired<RichString>;
  // Slot Map v1.1 §4.2 S1.subhead
  readonly subhead: Paired<RichParagraph>;
  // Slot Map v1.1 §4.2 S1.cta.secondary.label (optional; renders when supplied)
  readonly ctaSecondaryLabel?: Paired<string>;
  // Slot Map v1.1 §4.2 S1.cta.secondary.target
  readonly ctaSecondaryTarget: LocaleAgnostic<SecondaryCtaTarget>;
  // Slot Map v1.1 §4.2 S1.metric.1, S1.metric.2, S1.metric.3
  readonly metrics: readonly [
    Paired<MetricCell>,
    Paired<MetricCell>,
    Paired<MetricCell>,
  ];
  // Slot Map v1.1 §4.2 S1.video.bed
  readonly video: LocaleAgnostic<Video>;
}

// Slot Map v1.1 §5.2 S2.uc.{N} composite
export interface UcCard {
  readonly name: Paired<string>;
  readonly framing: Paired<string>;
}

// Slot Map v1.1 §5 -- Section 2 Operational Reality
export interface Section2Slots {
  // Slot Map v1.1 §5.2 S2.eyebrow
  readonly eyebrow: Paired<string>;
  // Slot Map v1.1 §5.2 S2.heading
  readonly heading: Paired<string>;
  // Slot Map v1.1 §5.2 S2.pressure.{N} -- 4-6 items per segment
  readonly pressures: readonly Paired<string>[];
  // Slot Map v1.1 §5.2 S2.uc.eyebrow
  readonly ucEyebrow: Paired<string>;
  // Slot Map v1.1 §5.2 S2.uc.heading
  readonly ucHeading: Paired<string>;
  // Slot Map v1.1 §5.2 S2.uc.{N} -- 4-6 cards per segment
  readonly ucCards: readonly UcCard[];
}

// Slot Map v1.1 §6 -- Section 3 Per-Buyer-Chain Proof
// Discriminated tuple union on tabCount (3 or 4) per D-S25-1.
export type Section3Slots =
  | {
      readonly eyebrow: Paired<string>;
      readonly heading: Paired<string>;
      readonly tabCount: 3;
      readonly tabDefault: 1 | 2 | 3;
      readonly tabs: readonly [RoleTab, RoleTab, RoleTab];
    }
  | {
      readonly eyebrow: Paired<string>;
      readonly heading: Paired<string>;
      readonly tabCount: 4;
      readonly tabDefault: 1 | 2 | 3 | 4;
      readonly tabs: readonly [RoleTab, RoleTab, RoleTab, RoleTab];
    };

// Slot Map v1.1 §7 -- Section 4 Proof + Legitimacy block (12 slots)
export interface Section4Slots {
  // Zone A -- Stat strip (Slot Map v1.1 §7.2)
  readonly zoneAEyebrow: Paired<string>;
  // Fixed 4-tuple per Chassis Brief §6.2
  readonly zoneAMetrics: readonly [
    Paired<MetricCell>,
    Paired<MetricCell>,
    Paired<MetricCell>,
    Paired<MetricCell>,
  ];
  // Zone B -- PIM scene (Slot Map v1.1 §7.3)
  readonly zoneBEyebrow: Paired<string>;
  readonly zoneBVideo: LocaleAgnostic<Video>;
  readonly zoneBFrame: Paired<Paragraph>;
  // Metadata only; not rendered (Slot Map v1.1 §7.3 S4.B.uc.anchor)
  readonly zoneBUcAnchor: LocaleAgnostic<string>;
  // Zone C -- Regulatory chip rail (Slot Map v1.1 §7.4)
  readonly zoneCEyebrow: Paired<string>;
  // 4-7 chips preferred; chassis renders all supplied
  readonly zoneCChips: Paired<readonly Chip[]>;
}

// Slot Map v1.1 §8 -- Section 5 Final CTA (8 slots)
// S5.cta.pill.label is a chassis constant (D-S25-1); intentionally
// absent. Read from CONVERSION_CTA_LABELS at render time.
export interface Section5Slots {
  // Zone A -- FAQ accordion (Slot Map v1.1 §8.2)
  readonly faqEyebrow: Paired<string>;
  // 3-4 items per Slot Map v1.1 §8.2
  readonly faqItems: readonly FaqItem[];
  // Zone B -- Final CTA (Slot Map v1.1 §8.3)
  readonly ctaEyebrow: Paired<string>;
  readonly ctaHeadingLine1: Paired<RichString>;
  readonly ctaHeadingLine2: Paired<RichString>;
  readonly ctaFrame: Paired<Paragraph>;
  readonly ctaReassurance: Paired<string>;
}

// Slot Map v1.1 §9 -- Sticky CTA mechanic (5 slots)
// Sticky.pill.label, Sticky.render.start, and Sticky.render.end are
// chassis constants (D-S25-1); intentionally absent. Read from
// CONVERSION_CTA_LABELS and STICKY_RENDER_TRIGGERS at render time.
export interface StickyCtaSlots {
  // Slot Map v1.1 §9.2 Sticky.prompt.mobile
  readonly promptMobile: Paired<string>;
  // Slot Map v1.1 §9.2 Sticky.prompt.desktop
  readonly promptDesktop: Paired<string>;
}

// ---------------------------------------------------------------------------
// Composite fill -- all sections
// ---------------------------------------------------------------------------

// Chassis Design Brief v1.1 §1: "one chassis, all segments, all locales."
export interface ChassisFill {
  readonly hero: HeroSlots;
  readonly section2: Section2Slots;
  readonly section3: Section3Slots;
  readonly section4: Section4Slots;
  readonly section5: Section5Slots;
  readonly sticky: StickyCtaSlots;
}
