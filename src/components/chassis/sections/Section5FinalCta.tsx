import type { Locale } from '@/lib/i18n';
import type { Section5Slots } from '@/lib/chassis/slots';
import {
  FAQ_CLOSING_CTA_LEAD,
  FAQ_CLOSING_CTA_SUB,
  FAQ_EYEBROW,
} from '@/lib/chassis/constants';
import { RichText } from '../primitives/RichText';
import { Section5CtaPill } from '../primitives/Section5CtaPill';
import { FaqAccordion } from '../primitives/FaqAccordion';
import { Section5SnapBridge } from '../primitives/Section5SnapBridge';
import { MeetingRequestForm } from '@/components/shared/MeetingRequestForm';

// VM-456 D-S56-1: variant discriminates the §F render. 'segment' is
// the contracted composition (heading + reassurance + light pill on
// off-white, no form); 'home' is the legacy form-embedded composition
// preserved verbatim for a future Home migration. The §E FAQ block
// and the snap bridge render identically across both variants.
//
// VM-515: §E mobile-only eyebrow above the heading and tappable closing
// CTA row replacing the orphaned closing line on <lg. Desktop renders
// the existing .vm-faq-closing-line via hidden lg:block. The carousel
// itself lives in FaqAccordion via the withStep structural fork. Both
// the eyebrow and the closing-CTA anchor are gated to withStep segments
// only; the basic branch (hospitales-publicos) stays byte-for-byte on
// pre-VM-515 main.

export function Section5FinalCta({
  locale,
  fill,
  ctaLabel,
  variant,
}: {
  locale: Locale;
  fill: Section5Slots;
  ctaLabel: string;
  variant: 'home' | 'segment';
}) {
  const isWithStep = fill.faqItems[0]?.kind === 'withStep';
  return (
    <>
      {/* VM-453 AC6: bridges Space/PageDown advance from §D to §E when
          §D's natural height exceeds one spacebar advance. Yields to
          native scroll outside that case. Safe for every §E variant. */}
      <Section5SnapBridge />
      {/* §E -- FAQ accordion (Slot Map v1.8 §8.2; VM-451 UAT r1, VM-453).
          Own snap section so spacebar scroll anchors the FAQ to the
          viewport top with full-screen min-height, parallel to every
          other chassis section. Heading + grid + closing line live here;
          the Final CTA pill lives in the sibling section below. */}
      <section
        id="segment-faq"
        aria-labelledby="segment-faq-heading"
        className="vm-segment-faq-section"
        data-faq-kind={fill.faqItems[0]?.kind ?? 'basic'}
      >
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          {/* VM-515: mobile-only eyebrow above the section heading. */}
          {isWithStep ? (
            <span className="vm-faq-eyebrow lg:hidden">
              {FAQ_EYEBROW[locale]}
            </span>
          ) : null}
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
          {/* VM-515: mobile-only closing-CTA row. Anchor scroll honors
              html { scroll-padding-top } keyed to --vm-nav-effective-h. */}
          {isWithStep ? (
            <a href="#segment-final-cta" className="vm-faq-closing-cta lg:hidden">
              <span className="vm-faq-closing-cta__icon" aria-hidden="true">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3.5h10a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H6l-3 2.5v-2.5H2a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z" />
                </svg>
              </span>
              <span className="vm-faq-closing-cta__text">
                <strong>{FAQ_CLOSING_CTA_LEAD[locale]}</strong>
                <small>{FAQ_CLOSING_CTA_SUB[locale]}</small>
              </span>
              <span className="vm-faq-closing-cta__chev" aria-hidden="true">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 1.5 7 5 3 8.5" />
                </svg>
              </span>
            </a>
          ) : null}
          {fill.faqClosingLine ? (
            <p className="vm-faq-closing-line hidden lg:block">
              {fill.faqClosingLine[locale]}
            </p>
          ) : null}
        </div>
      </section>

      {variant === 'segment' ? (
        <SegmentFinalCta
          locale={locale}
          fill={fill}
          ctaLabel={ctaLabel}
        />
      ) : (
        <HomeFinalCta locale={locale} fill={fill} ctaLabel={ctaLabel} />
      )}
    </>
  );
}

// §F segment variant (VM-456 D-S56-1). Off-white register, no form.
// The pill is a Home-routing Link; the Home Final CTA is the single
// conversion destination site-wide. Renders nothing if a fixture has
// not authored the required heading + reassurance slots yet (a
// fixture-author bug surfaced via empty section).
function SegmentFinalCta({
  locale,
  fill,
  ctaLabel,
}: {
  locale: Locale;
  fill: Section5Slots;
  ctaLabel: string;
}) {
  const { heading, reassurance } = fill;
  if (!heading || !reassurance) return null;

  return (
    <section
      id="segment-final-cta"
      aria-labelledby="segment-final-cta-heading"
      className="vm-segment-final-cta-section vm-segment-final-cta-section--segment"
    >
      <div className="mx-auto" style={{ maxWidth: 880, width: '100%' }}>
        <h2
          id="segment-final-cta-heading"
          className="font-display vm-segment-final-cta-heading"
          style={{
            color: '#0A1628',
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
            fontWeight: 600,
            margin: 0,
          }}
        >
          {heading[locale]}
        </h2>

        <p
          className="font-body"
          style={{
            color: '#0A1628',
            opacity: 0.8,
            lineHeight: 1.55,
            fontSize: 16,
            marginTop: 16,
            marginBottom: 40,
            maxWidth: 580,
          }}
        >
          {reassurance[locale]}
        </p>

        <Section5CtaPill
          variant="light"
          locale={locale}
          label={ctaLabel}
        />
      </div>
    </section>
  );
}

// §F home variant (legacy form-embedded composition). Reserved and
// ready for a future Home migration; no page renders this branch
// today. Requires all five cta* slots; if a home-variant fixture
// fails to author them, the section renders nothing (fail-closed).
function HomeFinalCta({
  locale,
  fill,
  ctaLabel,
}: {
  locale: Locale;
  fill: Section5Slots;
  ctaLabel: string;
}) {
  const {
    ctaEyebrow,
    ctaHeadingLine1,
    ctaHeadingLine2,
    ctaFrame,
    ctaReassurance,
  } = fill;
  if (
    !ctaEyebrow ||
    !ctaHeadingLine1 ||
    !ctaHeadingLine2 ||
    !ctaFrame ||
    !ctaReassurance
  ) {
    return null;
  }

  return (
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
            {ctaEyebrow[locale]}
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
            <RichText segments={ctaHeadingLine1[locale]} />
            <br />
            <RichText segments={ctaHeadingLine2[locale]} />
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
            {ctaFrame[locale]}
          </p>

          {/* CTA pill: chassis-constant label; scrolls to the form below */}
          <Section5CtaPill variant="navy" label={ctaLabel} />

          {/* Reassurance microcopy */}
          <p
            className="font-ui text-text-on-dark-muted"
            style={{ fontSize: 13, marginTop: 12 }}
          >
            {ctaReassurance[locale]}
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
  );
}
