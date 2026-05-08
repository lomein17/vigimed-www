// Typed-slot schema for the universal segment-page chassis.
// Authority: Slot Map v1.1 / v1.3 (slug 9fb768019127), Chassis Design
// Brief v1.1 / v1.3 (slug 7c5e7054002b). Chassis-constant slots (CTA
// labels, render triggers) are intentionally absent from the fill
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

// Slot Map v1.1 §6.2 / v1.3 §6.2: composite per buyer-chain role
// (Section 3). Each field is Paired per Slot Map locale handling.
//
// Two shapes:
//   - RoleTabFlat: legacy flat-tab shape used by Section3FlatSlots.
//   - RoleTabWithChain: VM-448 D-S49-3 chain-aware shape that adds a
//     responsibility-domain `tier` eyebrow, the `chainTiers` enum array
//     driving the active-tier spotlight on the chain-anchor rail, and
//     an optional short-form `labelMobile` for the accordion trigger
//     when the desktop label exceeds visual budget on narrow viewports.
export interface RoleTabFlat {
  readonly label: Paired<string>;
  readonly result: Paired<string>;
  readonly step: Paired<string>;
  readonly quote: Paired<string>;
  readonly regulatory: Paired<string>;
}

// VM-448 S55 FIX 2: chain branch collapses prior result + step into a
// single prose `body` block at body-copy type scale. Quote becomes the
// without-VigiMed counterfactual, citation carries the verbatim
// regulatory clause, and the chip rail is unchanged. The flat branch
// retains result + step (RoleTabFlat) verbatim for backward compat.
export interface RoleTabWithChain
  extends Omit<RoleTabFlat, 'result' | 'step'> {
  readonly tier: Paired<string>;
  readonly chainTiers: LocaleAgnostic<readonly ChainTierId[]>;
  readonly labelMobile?: Paired<string>;
  // Locale-agnostic image source path (relative to /public). Square aspect,
  // rendered as a circular crop on each tab between the responsibility-
  // domain eyebrow and the role label. Render diameter is set in CSS
  // (.vm-section-3-tab-headshot, 72px desktop / 56px mobile per VM-448
  // S55 FIX 3). Source asset constraint: square, max 200x200.
  readonly headshot?: LocaleAgnostic<string>;
  // Single prose body block (VM-448 S55 FIX 2). Replaces prior result +
  // step pair. 50-word hard cap enforced at fixture-author time.
  readonly body: Paired<string>;
  // Verbatim regulatory citation rendered above the chip rail. Italic at
  // low saturation, smaller type than body. Optional at chassis level;
  // segments that do not author citation copy render only the chip rail.
  // 50-word hard cap enforced at fixture-author time.
  readonly regulatoryCitation?: Paired<string>;
}

// Backward-compat alias: existing imports of `RoleTab` resolve to the
// flat shape (only Section3PerBuyerChainProof.tsx imports it today,
// but the alias avoids a no-op rename across the tree).
export type RoleTab = RoleTabFlat;

// Chain anchor tier identifiers (D-S49-3 segment-binding analytics-
// maturity chain). Slug-style (no diacritics) for engineering ergonomics;
// display labels carry the diacritics. Stable rendering order is the
// CHAIN_TIER_ORDER constant; the chassis renders all five tiers in this
// order regardless of which subset a given role owns.
export type ChainTierId =
  | 'senal'
  | 'patron'
  | 'tendencia'
  | 'criterio'
  | 'estandar';

export const CHAIN_TIER_ORDER: readonly ChainTierId[] = [
  'senal',
  'patron',
  'tendencia',
  'criterio',
  'estandar',
] as const;

// Slot Map v1.3 §6.3 chassis-level chain anchor content. Filled once per
// segment-page instance; the chassis renders the same five-tier rail on
// every tab, with the active role's chainTiers spotlit.
export interface ChainAnchor {
  readonly tiers: Readonly<
    Record<
      ChainTierId,
      {
        readonly label: Paired<string>;
        readonly description: Paired<string>;
      }
    >
  >;
  readonly frame: Paired<string>;
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

// Slot Map v1.1 §5.2 S2.uc.{N} composite.
// Content cap: framing <=40 words / <=240 chars (relaxed from earlier
// chassis spec to fit the persona-matrix variant). The chassis applies
// no runtime cap; copy is governed at fixture-author time.
export interface UcCard {
  readonly name: Paired<string>;
  readonly framing: Paired<string>;
}

// Persona key for the Section 2 persona-matrix variant (VM-447 D-S52-2).
// Stable order is enforced at the chassis component, not at the type level.
export type PersonaKey = 'jefeUveh' | 'calidad' | 'medica' | 'general';

// Slot Map v1.1 §5.2 S2.uc.persona composite. Each persona contributes a
// role label (top line of the tab), a chain-tier subtitle, and the four
// UC cards rendered for that persona's panel.
export interface PersonaUcSet {
  readonly roleLabel: Paired<string>;
  readonly tierLabel: Paired<string>;
  readonly cards: readonly UcCard[];
}

// Slot Map v1.1 §5 -- Section 2 Operational Reality.
// Two variants, discriminated by the presence of `ucByPersona`:
//   - Section2FlatUcSlots: legacy flat-UC strip (eyebrow/heading +
//     numbered pressures + ucEyebrow/ucHeading + ucCards).
//   - Section2PersonaMatrixSlots: VM-447 D-S52-2 persona x domain
//     matrix; pressures optional (drops the pressure block when absent
//     or empty), no ucEyebrow/ucHeading, supplement line below the grid.

export interface Section2FlatUcSlots {
  readonly eyebrow: Paired<string>;
  readonly heading: Paired<string>;
  readonly pressures: readonly Paired<string>[];
  readonly ucEyebrow: Paired<string>;
  readonly ucHeading: Paired<string>;
  readonly ucCards: readonly UcCard[];
}

export interface Section2PersonaMatrixSlots {
  readonly eyebrow: Paired<string>;
  readonly heading: Paired<string>;
  readonly pressures?: readonly Paired<string>[];
  readonly ucByPersona: Readonly<Record<PersonaKey, PersonaUcSet>>;
  readonly defaultPersona: PersonaKey;
  readonly ucSupplement: Paired<string>;
}

export type Section2Slots =
  | Section2FlatUcSlots
  | Section2PersonaMatrixSlots;

// Slot Map v1.1 §6 / v1.3 §6 -- Section 3 Per-Buyer-Chain Proof.
// Two-level discriminated union:
//   - Outer: presence of a top-level `chain` block selects the chain-
//     aware variant (VM-448 D-S49-3) vs. the legacy flat variant.
//   - Inner: tabCount (3 | 4) narrows the tabs tuple length per D-S25-1.
// Section3FlatSlots is retained verbatim for backward compatibility;
// hospitales-publicos.ts conforms to it without modification.
export type Section3FlatSlots =
  | {
      readonly eyebrow: Paired<string>;
      readonly heading: Paired<string>;
      readonly tabCount: 3;
      readonly tabDefault: 1 | 2 | 3;
      readonly tabs: readonly [RoleTabFlat, RoleTabFlat, RoleTabFlat];
    }
  | {
      readonly eyebrow: Paired<string>;
      readonly heading: Paired<string>;
      readonly tabCount: 4;
      readonly tabDefault: 1 | 2 | 3 | 4;
      readonly tabs: readonly [
        RoleTabFlat,
        RoleTabFlat,
        RoleTabFlat,
        RoleTabFlat,
      ];
    };

export type Section3WithChainSlots =
  | {
      readonly eyebrow: Paired<string>;
      readonly heading: Paired<string>;
      readonly headingFrame?: Paired<RichParagraph>;
      readonly tabCount: 3;
      readonly tabDefault: 1 | 2 | 3;
      readonly tabs: readonly [
        RoleTabWithChain,
        RoleTabWithChain,
        RoleTabWithChain,
      ];
      readonly chain: ChainAnchor;
    }
  | {
      readonly eyebrow: Paired<string>;
      readonly heading: Paired<string>;
      readonly headingFrame?: Paired<RichParagraph>;
      readonly tabCount: 4;
      readonly tabDefault: 1 | 2 | 3 | 4;
      readonly tabs: readonly [
        RoleTabWithChain,
        RoleTabWithChain,
        RoleTabWithChain,
        RoleTabWithChain,
      ];
      readonly chain: ChainAnchor;
    };

export type Section3Slots = Section3FlatSlots | Section3WithChainSlots;

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
