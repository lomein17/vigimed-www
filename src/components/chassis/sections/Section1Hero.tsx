import type { Locale } from '@/lib/i18n';
import type { HeroSlots } from '@/lib/chassis/slots';
import { MetricCellValue } from '../primitives/MetricCellValue';
import { RichText } from '../primitives/RichText';

export function Section1Hero({
  locale,
  fill,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ctaLabel,
}: {
  locale: Locale;
  fill: HeroSlots;
  // ctaLabel: kept in the chassis signature even though Section1Hero no
  // longer renders the primary <a>. Reversible: see the CTA-pair comment
  // below for the V1 disable rationale and how to restore.
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

      <div
        className="relative z-10 w-full"
        style={{
          // VM-445 UAT 2026-05-07: align segment Hero content horizontally
          // with Home Hero (Hero.tsx). Same clamp anchor; left edge sits in
          // the left third on desktop, scales down to the gutter floor on
          // narrow viewports. Replaces the prior mx-auto + maxWidth: 1200
          // centering wrapper so segment content aligns with Home content
          // pixel-for-pixel. The matching .vm-segment-hero-section
          // padding-left/right rule was removed in globals.css to make this
          // inline clamp the sole horizontal anchor.
          paddingLeft: 'clamp(var(--site-gutter), 15vw, 208px)',
          paddingRight: 'var(--site-gutter)',
        }}
      >
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

          {/* Subhead with inline emphasis. Typography and stepped
              max-width pinned to Home Hero (684/706/739) per VM-445 UAT
              2026-05-07. whiteSpace: 'pre-line' translates `\n`
              characters embedded in segment text into hard breaks while
              still letting the browser wrap on overflow; fixtures that
              omit `\n` are unaffected. */}
          <div className="max-w-[684px] md:max-w-[706px] lg:max-w-[739px]">
            <p
              className="font-body"
              style={{
                color: '#D8DCE4',
                lineHeight: 1.6,
                fontSize: '1.2292rem',
                whiteSpace: 'pre-line',
              }}
            >
              <RichText segments={subhead} />
            </p>
          </div>

          {/* CTA pair: primary `Solicitar una reunión` removed V1 per
              VM-445 UAT 2026-05-07; conversion-path triplet (Hero
              primary + Sticky pill + Final CTA pill) being dismantled
              site-wide. Final CTA section pill remains. Secondary CTA
              renders when fixture supplies ctaSecondaryLabel. minHeight
              reserves layout space when the row is empty. Reversible:
              restore the primary <a> and drop minHeight. */}
          <div
            className="flex flex-col sm:flex-row gap-3"
            style={{ minHeight: 44 }}
          >
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
    </section>
  );
}
