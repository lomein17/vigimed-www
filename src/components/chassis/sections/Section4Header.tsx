// VM-450 Section 4 top-level header block. Eyebrow + 2-line heading +
// frame paragraph, centered. Rendered when fill.header is supplied;
// segments that omit fill.header render Section 4 with no top-level
// header (legacy behavior).
//
// Color treatment is theme-driven via the parent section className
// (.vm-segment-section-4--theme-navy flips the palette to white on
// navy, brand-cyan eyebrow + accent, bold-amber inline span on the
// frame). The component itself emits no theme-aware styles.

import type { Locale } from '@/lib/i18n';
import type { Section4Header as Section4HeaderSlots } from '@/lib/chassis/slots';
import { RichText } from '../primitives/RichText';

export function Section4Header({
  locale,
  fill,
}: {
  locale: Locale;
  fill: Section4HeaderSlots;
}) {
  // VM-450 UAT r3: heading lives inside its own max-width: 640px
  // wrapper so the frame paragraph can escape that constraint and
  // span the full Section 4 inner content container (~1200px). The
  // eyebrow stays a direct child of the header so it sits centered
  // against the same container the frame uses.
  return (
    <header className="vm-section-4-header">
      <p
        id="segment-section-4-heading"
        className="vm-section-4-header-eyebrow font-ui"
      >
        {fill.eyebrow[locale]}
      </p>
      <div className="vm-section-4-header-heading-wrap">
        <h2 className="vm-section-4-header-heading font-display">
          <span className="vm-section-4-header-heading-line">
            <RichText segments={fill.headingLine1[locale]} />
          </span>
          <span className="vm-section-4-header-heading-line">
            <RichText segments={fill.headingLine2[locale]} />
          </span>
        </h2>
      </div>
      <p className="vm-section-4-header-frame font-body">
        <RichText segments={fill.frame[locale]} />
      </p>
    </header>
  );
}
