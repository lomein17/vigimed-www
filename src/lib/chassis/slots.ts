// Typed-slot schema for the universal segment-page chassis.
// Authority: Slot Map v1.9 (slug 9fb768019127), Chassis Design Brief
// v1.8 (slug 7c5e7054002b). Chassis-constant slots (CTA labels, render
// triggers, FAQ step-indicator labels) are intentionally absent from
// the fill interfaces and live in constants.ts.

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

// Slot Map v1.6 §3 / §8.2 faqItem: discriminated union (VM-451).
//   - kind: 'basic'    legacy minimal Q+A surface (hospitales-publicos).
//   - kind: 'withStep' Pattern 2 inline-expand variant (centros-medicos).
//     step indexes into FAQ_STEP_LABELS for the locale-aware `PASO N ·
//     LABEL` strip; preview is the closed-state subhead and renders the
//     first sentence of answer (fixture-author binding, AC-F6).
export type FaqItem =
  | {
      readonly kind: 'basic';
      readonly question: Paired<string>;
      readonly answer: Paired<string>;
    }
  | {
      readonly kind: 'withStep';
      readonly step: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
      readonly question: Paired<string>;
      readonly preview: Paired<string>;
      readonly answer: Paired<string>;
    };

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

// Slot Map v1.1 §7 -- Section 4 Proof + Legitimacy block.
// VM-450 D-S56-2 lifted the flat shape into theme + per-zone
// discriminated unions to fit the Centros Médicos regulatoryDocument
// treatment without disturbing the legacy hospitales-publicos render.

// VM-450 Zone A obligation card (Centros Médicos §D regulatoryDocument
// theme). Three string fields per card: monospaced article anchor,
// body label, frequency tag.
export interface ObligationCard {
  readonly articleAnchor: Paired<string>;
  readonly label: Paired<string>;
  readonly frequency: Paired<string>;
}

// VM-450 Section 4 top-level header block (eyebrow + 2-line heading +
// frame). Optional at chassis level; segments that author their §D
// header render with it, segments without render Section 4 with no
// top-level header (legacy behavior).
export interface Section4Header {
  readonly eyebrow: Paired<string>;
  readonly headingLine1: Paired<RichString>;
  readonly headingLine2: Paired<RichString>;
  readonly frame: Paired<RichParagraph>;
}

// VM-450 Zone A discriminated union. kind: 'metricStrip' is the legacy
// stat-strip shape (existing behavior preserved verbatim). kind:
// 'obligationGrid' is the Centros Médicos §D 4-card variant.
export type Section4ZoneA =
  | {
      readonly kind: 'metricStrip';
      readonly eyebrow: Paired<string>;
      readonly metrics: readonly [
        Paired<MetricCell>,
        Paired<MetricCell>,
        Paired<MetricCell>,
        Paired<MetricCell>,
      ];
    }
  | {
      readonly kind: 'obligationGrid';
      readonly cards: readonly [
        ObligationCard,
        ObligationCard,
        ObligationCard,
        ObligationCard,
      ];
    };

// VM-450 D-S56-2: Zone B widens to discriminated union. kind: 'video'
// is the legacy PIM-scene shape (existing behavior preserved verbatim).
// kind: 'regulatoryDocument' is the Centros Médicos §D Acta de
// Cumplimiento variant. Word/char limits are fixture-author concerns;
// the chassis applies no runtime caps.
export type Section4ZoneB =
  | {
      readonly kind: 'video';
      readonly eyebrow: Paired<string>;
      readonly video: LocaleAgnostic<Video>;
      readonly frame: Paired<Paragraph>;
      // Metadata only; not rendered (Slot Map v1.1 §7.3 S4.B.uc.anchor)
      readonly ucAnchor: LocaleAgnostic<string>;
    }
  | {
      readonly kind: 'regulatoryDocument';
      readonly actaHeader: Paired<string>;
      readonly folio: Paired<string>;
      readonly establecimientoLabel: Paired<string>;
      readonly marcoNormativo: Paired<string>;
      readonly obligationClauses: readonly {
        readonly text: Paired<string>;
        readonly evidence: Paired<string>;
      }[];
      readonly closingLine: Paired<string>;
      readonly sealLabel: Paired<string>;
    };

export interface Section4Slots {
  // VM-450: 'navy' unlocks the regulatoryDocument visual treatment and
  // flips the section background; 'offwhite' preserves the §9.1 page
  // rhythm for legacy segments.
  readonly theme: 'offwhite' | 'navy';
  // Optional top-level section header (eyebrow + 2-line heading + frame).
  readonly header?: Section4Header;
  readonly zoneA: Section4ZoneA;
  readonly zoneB: Section4ZoneB;
  // Zone C -- Regulatory chip rail (Slot Map v1.1 §7.4). 4-7 chips
  // preferred; chassis renders all supplied.
  readonly zoneCEyebrow: Paired<string>;
  readonly zoneCChips: Paired<readonly Chip[]>;
}

// Slot Map v1.9 §8 -- Section 5 Final CTA.
// S5.cta.pill.label is a chassis constant (D-S25-1); intentionally
// absent. Read from CONVERSION_CTA_LABELS at render time.
// VM-451: Zone A FAQ surface widened per Pablo overrides. S5.faq.eyebrow
// removed; heading sits alone above the grid, closing line sits below.
// Stagger slot ships; animation logic deferred to follow-on patch.
// VM-456 (D-S56-1): Zone B contracts on segment pages. Two new
// optional slots, `heading` and `reassurance`, drive the segment-page
// composition (heading + reassurance + pill on off-white, no form).
// The legacy cta* slots are flipped to optional so segment fixtures
// can drop them entirely; they remain required on the home-variant
// render path (Section5FinalCta variant='home') for the future Home
// migration.
export interface Section5Slots {
  // Zone A -- FAQ accordion (Slot Map v1.8 §8.2; VM-451)
  readonly faqHeading?: Paired<string>;
  readonly faqCount: 3 | 4 | 5 | 6;
  readonly faqDefaultOpen: 'none' | 1 | 2 | 3 | 4 | 5 | 6;
  readonly faqMotionStagger?: boolean;
  readonly faqItems: readonly FaqItem[];
  readonly faqClosingLine?: Paired<string>;
  // Zone B segment-page contraction (VM-456 D-S56-1). Required when
  // Section5FinalCta variant='segment'; absent on variant='home'.
  readonly heading?: Paired<string>;
  readonly reassurance?: Paired<string>;
  // Zone B legacy Final CTA slots (Slot Map v1.1 §8.3). Required when
  // Section5FinalCta variant='home'; absent on variant='segment'.
  readonly ctaEyebrow?: Paired<string>;
  readonly ctaHeadingLine1?: Paired<RichString>;
  readonly ctaHeadingLine2?: Paired<RichString>;
  readonly ctaFrame?: Paired<Paragraph>;
  readonly ctaReassurance?: Paired<string>;
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
