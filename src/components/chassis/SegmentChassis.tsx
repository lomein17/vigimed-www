import type { Locale } from '@/lib/i18n';
import type { ChassisFill } from '@/lib/chassis/slots';
import { CONVERSION_CTA_LABELS } from '@/lib/chassis/constants';
import { Section1Hero } from './sections/Section1Hero';
import { Section2Placeholder } from './sections/_placeholders/Section2Placeholder';
import { Section3Placeholder } from './sections/_placeholders/Section3Placeholder';
import { Section4Placeholder } from './sections/_placeholders/Section4Placeholder';
import { Section5FinalCta } from './sections/Section5FinalCta';

// Chassis Design Brief v1.1 §9.1 page rhythm:
// Section 1 Hero       -- navy #0A1628
// Section 2            -- off-white #F5F3EE
// Section 3            -- navy #0A1628
// Section 4            -- off-white #F5F3EE
// Section 5 Final CTA  -- navy #0A1628

export function SegmentChassis({
  locale,
  fill,
}: {
  locale: Locale;
  fill: ChassisFill;
}) {
  const ctaLabel = CONVERSION_CTA_LABELS[locale];

  return (
    <>
      <Section1Hero locale={locale} fill={fill.hero} ctaLabel={ctaLabel} />
      <Section2Placeholder />
      <Section3Placeholder />
      <Section4Placeholder />
      <Section5FinalCta
        locale={locale}
        fill={fill.section5}
        ctaLabel={ctaLabel}
      />
    </>
  );
}
