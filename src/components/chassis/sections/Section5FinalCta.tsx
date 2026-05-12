import type { Locale } from '@/lib/i18n';
import type { Section5Slots } from '@/lib/chassis/slots';
import { RichText } from '../primitives/RichText';
import { Section5CtaPill } from '../primitives/Section5CtaPill';
import { FaqAccordion } from '../primitives/FaqAccordion';
import { MeetingRequestForm } from '@/components/shared/MeetingRequestForm';

export function Section5FinalCta({
  locale,
  fill,
  ctaLabel,
}: {
  locale: Locale;
  fill: Section5Slots;
  ctaLabel: string;
}) {
  const ctaEyebrow = fill.ctaEyebrow[locale];
  const headingLine1 = fill.ctaHeadingLine1[locale];
  const headingLine2 = fill.ctaHeadingLine2[locale];
  const frame = fill.ctaFrame[locale];
  const reassurance = fill.ctaReassurance[locale];

  return (
    <>
      {/* §E -- FAQ accordion (Slot Map v1.6 §8.2; VM-451 UAT r1).
          Own snap section so spacebar scroll anchors the FAQ to the
          viewport top with full-screen min-height, parallel to every
          other chassis section. Heading + grid + closing line live here;
          the Final CTA pill + form live in the sibling section below. */}
      <section
        id="segment-faq"
        aria-labelledby="segment-faq-heading"
        className="vm-segment-faq-section"
      >
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          {fill.faqHeading ? (
            <h3 id="segment-faq-heading" className="vm-faq-heading">
              {fill.faqHeading[locale]}
            </h3>
          ) : null}
          <FaqAccordion
            items={fill.faqItems}
            locale={locale}
            defaultOpen={fill.faqDefaultOpen}
            motionStagger={fill.faqMotionStagger ?? false}
          />
          {fill.faqClosingLine ? (
            <p className="vm-faq-closing-line">
              {fill.faqClosingLine[locale]}
            </p>
          ) : null}
        </div>
      </section>

      {/* §F -- Final CTA pill + meeting-request form (Slot Map v1.1 §8.3). */}
      <section
        id="segment-final-cta"
        aria-labelledby="segment-final-cta-heading"
        className="vm-segment-final-cta-section"
      >
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <div style={{ maxWidth: 680 }}>
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
              {ctaEyebrow}
            </p>

            <h2
              id="segment-final-cta-heading"
              className="font-display text-text-on-dark"
              style={{
                fontSize: 'var(--text-h2)',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
                fontWeight: 500,
              }}
            >
              <RichText segments={headingLine1} />
              <br />
              <RichText segments={headingLine2} />
            </h2>

            <p
              className="font-body"
              style={{
                color: 'rgba(255,255,255,0.78)',
                lineHeight: 1.55,
                fontSize: 17,
                marginTop: 16,
                marginBottom: 32,
              }}
            >
              {frame}
            </p>

            {/* CTA pill: chassis-constant label; scrolls to the form below */}
            <Section5CtaPill label={ctaLabel} />

            {/* Reassurance microcopy */}
            <p
              className="font-ui text-text-on-dark-muted"
              style={{ fontSize: 13, marginTop: 12 }}
            >
              {reassurance}
            </p>

            {/* Meeting-request form: shared component, also mounted on the
                Home Final CTA. Carries data-meeting-form-anchor for the
                CTA pill above to scroll to. */}
            <div style={{ marginTop: 40 }}>
              <MeetingRequestForm locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
