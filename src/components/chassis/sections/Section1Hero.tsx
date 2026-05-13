import type { Locale } from '@/lib/i18n';
import type { HeroSlots } from '@/lib/chassis/slots';
import { RichText } from '../primitives/RichText';

// Section 1 -- Hero (VM-457 Palantir two-column composition).
// Slot Map v1.12 §4 / Chassis Brief v1.12 §3.
//
// Left column (~60% desktop) renders the page-title H1; right column
// (~40% desktop) renders the claim body prose with inline emphasis.
// Below the title-claim row sits a full-bleed asset bed (16:6 desktop,
// 16:9 mobile). Below 1024px the columns stack and the asset bed
// preserves 16:9.
//
// VM-458 value tuning: page-title sizing uses --text-page-title (not
// --text-h1) so the H1 carries page-title mass at ~60% column width.
//
// VM-459 round 2: page-title weight downgrades to 400 (mass from size,
// not weight, per Palantir reference); claim consumes --text-page-claim
// token with max-width: 30ch and lineHeight: 1.3; section horizontal
// gutters are bilateral-symmetric.
//
// VM-456 closed the conversion-path triplet on segment pages (Hero
// primary CTA removed; Sticky + Final CTA pill remain). ctaLabel stays
// in the signature for downstream call-site stability but is unused.

export function Section1Hero({
  locale,
  fill,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ctaLabel,
}: {
  locale: Locale;
  fill: HeroSlots;
  ctaLabel: string;
}) {
  const hasVideo = !!fill.video.desktop;

  return (
    <section
      aria-labelledby="segment-hero-headline"
      className="vm-segment-hero-section relative overflow-hidden"
    >
      <div
        className="relative z-10 w-full"
        style={{
          // VM-445 UAT 2026-05-07: clamp anchor preserved verbatim per
          // VM-457 brief §2.1 so Hero left edge aligns with Home Hero.
          // VM-459 D-S58: paddingRight mirrors paddingLeft for bilateral
          // symmetry per Palantir composition reference. Cross-section
          // width drift accepted per WF-S58-1.
          paddingLeft: 'clamp(var(--site-gutter), 15vw, 208px)',
          paddingRight: 'clamp(var(--site-gutter), 15vw, 208px)',
        }}
      >
        <div className="vm-segment-hero-title-claim-row">
          <div className="vm-segment-hero-title-col">
            <h1
              id="segment-hero-headline"
              className="font-display text-text-on-dark"
              style={{
                fontSize: 'var(--text-page-title)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.08,
              }}
            >
              {fill.pageTitle[locale]}
            </h1>
          </div>
          <div className="vm-segment-hero-claim-col">
            <p
              className="font-body text-text-on-dark"
              style={{
                fontSize: 'var(--text-page-claim)',
                fontWeight: 400,
                lineHeight: 1.3,
                maxWidth: '30ch',
              }}
            >
              <RichText segments={fill.claim[locale]} />
            </p>
          </div>
        </div>

        <div className="vm-segment-hero-asset-bed" aria-hidden="true">
          {hasVideo ? (
            <video
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              poster={fill.video.poster}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source
                src={fill.video.desktop}
                type="video/mp4"
                media="(min-width: 768px)"
              />
              <source src={fill.video.mobile} type="video/mp4" />
            </video>
          ) : null}
        </div>
      </div>
    </section>
  );
}
