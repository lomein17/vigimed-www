// Chassis-level constants. Authority: Slot Map v1.1 §2 universal constraints,
// Chassis Design Brief v1.1 §2. These values are compile-time-locked and
// cannot be overridden per-segment under the document-path realization.

import type { Locale } from '@/lib/i18n';

// Slot Map v1.1 §2 conversion-path triplet (D-S25-1).
// Hero primary CTA, Sticky CTA pill, and Final CTA pill all render this
// same literal label per locale. Per-segment override is not permitted.
export const CONVERSION_CTA_LABELS = {
  'mx-es': 'Solicite una reunión',
  'us-en': 'Request a meeting',
} as const satisfies Record<Locale, string>;

// Slot Map v1.6 §S5.faq step-indicator label map (VM-451). Locale-aware;
// the FaqAccordion primitive reads FAQ_STEP_LABELS[step][locale] to
// derive the PASO N · LABEL strip rendered left of each `withStep`
// FaqItem. Step 7 (`SURFAR`) is provisional pending VM-388 cross-segment
// label review. us-en values are placeholder until segment fixtures are
// authored for the second locale.
export const FAQ_STEP_LABELS: Record<
  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
  Record<Locale, string>
> = {
  1: { 'mx-es': 'DESPLEGAR', 'us-en': '[us-en pending]' },
  2: { 'mx-es': 'DETECTAR', 'us-en': '[us-en pending]' },
  3: { 'mx-es': 'CONFIRMAR', 'us-en': '[us-en pending]' },
  4: { 'mx-es': 'COORDINAR', 'us-en': '[us-en pending]' },
  5: { 'mx-es': 'RESPONDER', 'us-en': '[us-en pending]' },
  6: { 'mx-es': 'DOCUMENTAR', 'us-en': '[us-en pending]' },
  // PROVISIONAL VM-388: cross-segment label review pending
  7: { 'mx-es': 'SURFAR', 'us-en': '[us-en pending]' },
  8: { 'mx-es': 'ESCALAR', 'us-en': '[us-en pending]' },
} as const;

// VM-515: §5 FAQ withStep mobile redesign chassis constants. Locale-aware
// strings rendered by every withStep segment on mobile (<lg). FAQ_EYEBROW
// sits above the section heading; FAQ_CLOSING_CTA_LEAD + FAQ_CLOSING_CTA_SUB
// populate the tappable closing-CTA row replacing the orphaned closing
// line. us-en values are placeholder until segment fixtures are authored
// for the second locale.
export const FAQ_EYEBROW = {
  'mx-es': 'PREGUNTAS FRECUENTES',
  'us-en': '[us-en pending]',
} as const satisfies Record<Locale, string>;

export const FAQ_CLOSING_CTA_LEAD = {
  'mx-es': '¿Otra duda? Hablemos.',
  'us-en': '[us-en pending]',
} as const satisfies Record<Locale, string>;

export const FAQ_CLOSING_CTA_SUB = {
  'mx-es': '30 minutos con el equipo que diseña VigiMed.',
  'us-en': '[us-en pending]',
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
