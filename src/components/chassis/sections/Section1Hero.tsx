import type { Locale } from '@/lib/i18n';
import type { HeroSlots } from '@/lib/chassis/slots';
import { RichText } from '../primitives/RichText';

// Section 1 -- Hero (VM-457 Palantir two-column composition).
// Slot Map v1.16 §4 / Chassis Brief v1.16 §3.
//
// Left column (~60% desktop) renders the page-title H1; right column
// (~40% desktop) renders the claim body prose with inline emphasis.
// Below the title-claim row sits a full-bleed asset bed at 21:9 across
// breakpoints (VM-459 corrective 3; was 16:9 unified under corrective
// 2, originally 16:6 desktop / 16:9 mobile under VM-457). Below 1024px
// the columns stack; on desktop the title-claim row and asset bed are
// wrapped in a shared .vm-segment-hero-content-frame envelope that
// carries the viewport-fit max-width cap and centers with auto margins
// when the 100svh envelope forces a horizontal shrink. The <picture>
// element below is unchanged: it points at the same public/ paths and
// serves the re-cropped 21:9 source via swap-in-place. CSS rules live
// in globals.css.
//
// VM-458 value tuning: page-title sizing uses --text-page-title (not
// --text-h1) so the H1 carries page-title mass at ~60% column width.
//
// VM-459 round 2: page-title weight downgrades to 400 (mass from size,
// not weight, per Palantir reference); claim consumes --text-page-claim
// token with lineHeight: 1.3; section horizontal gutters are bilateral-
// symmetric.
//
// VM-459 v1.13: --text-page-title and --text-page-claim retuned to
// Palantir Foundry for Energy reference sizes (5rem / 1.625rem ceilings).
// Asset bed adds an optional image branch that takes precedence over
// video.
//
// VM-459 v1.16 (corrective 4): pageTitle schema widens from
// Paired<string> to Paired<RichString> so segments can author inline
// emphasis spans (Centros Médicos authors a no-emphasis prefix +
// 'amber' segment-name; H1 inline fontWeight: 400 propagates to all
// child spans, so the amber color-only span renders at regular weight).
// The title-claim row and asset bed are now siblings inside a shared
// .vm-segment-hero-content-frame wrapper; the viewport-fit max-width
// math moved up to that wrapper so all three elements share one
// horizontal envelope and their left/right edges align by construction.
// Claim <p> reinstates max-width: 30ch + lg:ml-auto: the 30ch cap caps
// wrap width at ~4 lines for current copy, and ml-auto pushes the <p>
// to the right edge of its 40% column at >=1024px so the claim right
// edge aligns with the asset-bed right edge. Below 1024px the auto
// margin is inert and the claim sits at its column's natural left.
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
        <div className="vm-segment-hero-content-frame">
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
                <RichText segments={fill.pageTitle[locale]} />
              </h1>
            </div>
            <div className="vm-segment-hero-claim-col">
              <p
                className="font-body text-text-on-dark lg:ml-auto"
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
            {fill.image ? (
              <picture>
                <source
                  media="(min-width: 1024px)"
                  srcSet={fill.image.desktop}
                />
                <img
                  src={fill.image.mobile}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </picture>
            ) : hasVideo ? (
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
      </div>
    </section>
  );
}
