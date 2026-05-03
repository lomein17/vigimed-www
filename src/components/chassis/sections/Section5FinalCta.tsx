import type { Locale } from '@/lib/i18n';
import type { Section5Slots } from '@/lib/chassis/slots';
import { RichText } from '../primitives/RichText';

export function Section5FinalCta({
  locale,
  fill,
  ctaLabel,
}: {
  locale: Locale;
  fill: Section5Slots;
  ctaLabel: string;
}) {
  const faqEyebrow = fill.faqEyebrow[locale];
  const ctaEyebrow = fill.ctaEyebrow[locale];
  const headingLine1 = fill.ctaHeadingLine1[locale];
  const headingLine2 = fill.ctaHeadingLine2[locale];
  const frame = fill.ctaFrame[locale];
  const reassurance = fill.ctaReassurance[locale];

  return (
    <section
      id="segment-final-cta"
      aria-labelledby="segment-final-cta-heading"
      className="vm-segment-final-cta-section"
    >
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        {/* Zone A -- FAQ accordion */}
        <div style={{ maxWidth: 720, marginBottom: 64 }}>
          <p
            className="font-ui text-brand-500"
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            {faqEyebrow}
          </p>

          {/* FAQ items render as static collapsed headers. Interactive
              accordion wired in VM-437 with the rest of Section 5 body. */}
          <div className="flex flex-col gap-4">
            {fill.faqItems.map((item) => {
              const question = item.question[locale];
              return (
                <div
                  key={question}
                  className="flex items-center justify-between py-4"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <span
                    className="font-display text-text-on-dark"
                    style={{ fontSize: 18, fontWeight: 500 }}
                  >
                    {question}
                  </span>
                  <span
                    className="text-brand-500 ml-4 flex-shrink-0"
                    style={{ fontSize: 20 }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Zone B -- Final CTA */}
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

          {/* CTA pill: chassis-constant label */}
          <a
            href="#segment-final-cta"
            className="inline-flex items-center justify-center rounded-md px-6 py-3 font-ui text-white"
            style={{
              backgroundColor: 'var(--color-brand-500)',
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            {ctaLabel}
          </a>

          {/* Reassurance microcopy */}
          <p
            className="font-ui text-text-on-dark-muted"
            style={{ fontSize: 13, marginTop: 12 }}
          >
            {reassurance}
          </p>

          {/* Meeting-request form: mounts here in VM-437. Shared component
              across Home and segment pages; not in chassis brief scope. */}
          <div
            className="mt-10 rounded-lg p-6"
            style={{
              border: '1px dashed rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.3)',
              textAlign: 'center',
              fontSize: 14,
              fontFamily: 'var(--font-ui)',
            }}
          >
            [form mounts here in VM-437]
          </div>
        </div>
      </div>
    </section>
  );
}
