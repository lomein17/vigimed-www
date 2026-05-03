// Chassis-level constants. Authority: Slot Map v1.1 §2 universal constraints,
// Chassis Design Brief v1.1 §2. These values are compile-time-locked and
// cannot be overridden per-segment under the document-path realization.

import type { Locale } from '@/lib/i18n';

// Slot Map v1.1 §2 conversion-path triplet (D-S25-1).
// Hero primary CTA, Sticky CTA pill, and Final CTA pill all render this
// same literal label per locale. Per-segment override is not permitted.
export const CONVERSION_CTA_LABELS = {
  'mx-es': 'Solicitar una reunión',
  'us-en': 'Request a meeting',
} as const satisfies Record<Locale, string>;

// Slot Map v1.1 §9.2 Sticky.render.start / Sticky.render.end
export const STICKY_RENDER_TRIGGERS = {
  start: 'section2.top',
  end: 'section5.cta.top',
} as const;

// Slot Map v1.1 §2 em-dash carve-out (D-S25-1).
// Permitted only as a typographic null-state placeholder in metricCell
// value fields. Not prose punctuation anywhere else in the chassis.
export const EM_DASH_GLYPH = '—' as const;
