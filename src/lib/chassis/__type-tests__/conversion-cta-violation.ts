// Compile-time verifier for AC#2: the conversion-path triplet is impossible
// to override per-segment at the type level.
//
// The three chassis-constant CTA labels (Hero primary, Sticky pill, Final CTA
// pill) are intentionally absent from their respective slot interfaces in
// slots.ts. They live in CONVERSION_CTA_LABELS in constants.ts.
//
// Each @ts-expect-error below asserts that indexed property access on the
// type is a TypeScript error. If someone adds the property to the interface,
// the @ts-expect-error becomes unused and `npx tsc --noEmit` fails,
// surfacing the chassis-constant guarantee violation at build time.

/* eslint-disable @typescript-eslint/no-unused-vars */

import type { HeroSlots, StickyCtaSlots, Section5Slots } from '../slots';

// @ts-expect-error -- HeroSlots must not have ctaPrimaryLabel; it is a chassis constant
type _HeroCta = HeroSlots['ctaPrimaryLabel'];

// @ts-expect-error -- StickyCtaSlots must not have pillLabel; it is a chassis constant
type _StickyPill = StickyCtaSlots['pillLabel'];

// @ts-expect-error -- Section5Slots must not have ctaPillLabel; it is a chassis constant
type _FinalCtaPill = Section5Slots['ctaPillLabel'];
