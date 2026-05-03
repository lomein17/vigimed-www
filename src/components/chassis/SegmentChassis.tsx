import type { Locale } from '@/lib/i18n';
import type { ChassisFill } from '@/lib/chassis/slots';
import { CONVERSION_CTA_LABELS } from '@/lib/chassis/constants';
import { Section1Hero } from './sections/Section1Hero';
import { Section2OperationalReality } from './sections/Section2OperationalReality';
import { Section3PerBuyerChainProof } from './sections/Section3PerBuyerChainProof';
import { Section4ProofLegitimacy } from './sections/Section4ProofLegitimacy';
import { Section5FinalCta } from './sections/Section5FinalCta';
import { StickyCta } from './StickyCta';

// Chassis Design Brief v1.1 §9.1 page rhythm:
// Section 1 Hero       -- navy #0A1628
// Section 2            -- off-white #F5F3EE
// Section 3            -- navy #0A1628
// Section 4            -- off-white #F5F3EE
// Section 5 Final CTA  -- navy #0A1628
//
// StickyCta mounts at the orchestrator level (sibling of the sections)
// so its IntersectionObservers on #segment-section-2 and
// #segment-final-cta hold steady regardless of which section is in
// view. CONVERSION_CTA_LABELS is read once here and passed into Hero
// and Final CTA; StickyCta reads it directly off the constant.

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
      <Section2OperationalReality locale={locale} fill={fill.section2} />
      <Section3PerBuyerChainProof locale={locale} fill={fill.section3} />
      <Section4ProofLegitimacy locale={locale} fill={fill.section4} />
      <Section5FinalCta
        locale={locale}
        fill={fill.section5}
        ctaLabel={ctaLabel}
      />
      <StickyCta locale={locale} fill={fill.sticky} />
    </>
  );
}
