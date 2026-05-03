import type { Locale } from '@/lib/i18n';
import type { HeroSlots } from '@/lib/chassis/slots';
import { MetricCellValue } from '../primitives/MetricCellValue';
import { RichText } from '../primitives/RichText';

export function Section1Hero({
  locale,
  fill,
  ctaLabel,
}: {
  locale: Locale;
  fill: HeroSlots;
  ctaLabel: string;
}) {
  const contextBar = fill.contextBar[locale];
  const eyebrow = fill.eyebrow[locale];
  const h1Line1 = fill.h1Line1[locale];
  const h1Line2 = fill.h1Line2[locale];
  const subhead = fill.subhead[locale];
  const secondaryLabel = fill.ctaSecondaryLabel?.[locale];

  return (
    <section
      aria-labelledby="segment-hero-headline"
      className="vm-segment-hero-section relative overflow-hidden"
    >
      {/* Video bed: production assets land under VM-418. Navy background
          renders when video paths are empty (placeholder state). */}
      {fill.video.desktop && (
        <video
          aria-hidden="true"
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          poster={fill.video.poster}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'saturate(0.6)' }}
        >
          <source
            src={fill.video.desktop}
            type="video/mp4"
            media="(min-width: 768px)"
          />
          <source src={fill.video.mobile} type="video/mp4" />
        </video>
      )}

      <div className="relative z-10 w-full">
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <div className="flex flex-col gap-6 items-start">
            {/* Sub-segment context bar */}
            {contextBar && (
              <p
                className="font-ui text-text-on-dark-muted"
                style={{
                  fontSize: 13,
                  letterSpacing: '0.12em',
                }}
              >
                {contextBar}
              </p>
            )}

            {/* Eyebrow */}
            <p
              className="font-ui text-brand-500"
              style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </p>

            {/* H1 two-line display headline */}
            <div style={{ maxWidth: 820 }}>
              <h1
                id="segment-hero-headline"
                className="font-display text-text-on-dark"
                style={{
                  fontSize: 'var(--text-h1)',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.08,
                  fontWeight: 500,
                }}
              >
                <RichText segments={h1Line1} />
                <br />
                <RichText segments={h1Line2} />
              </h1>
            </div>

            {/* Subhead with inline emphasis */}
            <div style={{ maxWidth: 580 }}>
              <p
                className="font-body"
                style={{ color: '#C9D1DC', lineHeight: 1.6, fontSize: 17 }}
              >
                <RichText segments={subhead} />
              </p>
            </div>

            {/* CTA pair: primary (chassis constant) + optional secondary */}
            <div className="flex flex-col sm:flex-row gap-3">
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
              {secondaryLabel && (
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-md px-6 py-3 font-ui"
                  style={{
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                  }}
                >
                  {secondaryLabel}
                </a>
              )}
            </div>

            {/* Metric strip: 3-column anchor strip */}
            <div className="flex gap-8 pt-4">
              {fill.metrics.map((metric) => {
                const m = metric[locale];
                return (
                  <div key={m.label} className="text-center">
                    <div
                      className="font-display text-text-on-dark"
                      style={{
                        fontSize: 'var(--text-stat)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      <MetricCellValue value={m.value} />
                    </div>
                    <div
                      className="font-ui text-text-on-dark-muted"
                      style={{ fontSize: 14 }}
                    >
                      {m.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
