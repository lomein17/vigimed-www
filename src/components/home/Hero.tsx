import { homeContent as mxHome } from '@/content/mx-es/home';
import { homeContent as usHome } from '@/content/us-en/home';
import { type Locale } from '@/lib/i18n';

import { HeroCta } from './HeroCta';
import { HeroMedia } from './HeroMedia';

const contentByLocale = {
  'mx-es': mxHome,
  'us-en': usHome,
} as const;

export function Hero({ locale }: { locale: Locale }) {
  const home = contentByLocale[locale];
  const { hero, placeholderLabel } = home;
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <section
      aria-labelledby="hero-headline-mobile hero-headline-desktop"
      className="vm-hero-section relative w-full overflow-hidden"
      style={{
        background: 'var(--color-navy-800)',
      }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-navy-800">
        {isDev && (
          <span className="absolute top-4 right-4 font-mono text-xs text-white/50">
            {placeholderLabel}
          </span>
        )}
      </div>

      <HeroMedia
        heroVideo={hero.heroVideo}
        mobileH1={hero.mobileH1}
        mobileH2={hero.mobileH2}
        ctaLabel={hero.ctaLabel}
        playLabel={hero.videoToggle.playLabel}
        pauseLabel={hero.videoToggle.pauseLabel}
      />

      <div
        className="relative z-10 w-full py-section hidden lg:block"
        style={{
          // VM-364: Hero-specific horizontal anchor. Left edge sits in the
          // left third of the composition on desktop (clamped to 208px at
          // wide viewports), scales down to the standard gutter floor on
          // narrow ones. Right padding stays on the global gutter.
          paddingLeft: 'clamp(var(--site-gutter), 15vw, 208px)',
          paddingRight: 'var(--site-gutter)',
        }}
      >
        <div className="flex flex-col gap-6 justify-center items-start">
          <p
            className="font-ui"
            style={{
              color: '#2FBBF7',
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              lineHeight: 1.4,
            }}
          >
            {hero.eyebrow}
          </p>

          <div className="max-w-[1100px]">
            <h1
              id="hero-headline-desktop"
              className="text-text-on-dark text-[2.333rem] lg:text-[3.583rem]"
              style={{
                letterSpacing: '-0.015em',
                lineHeight: 1.08,
                fontWeight: 500,
              }}
            >
              {hero.headlineLine1}
              <br />
              {hero.headlineLine2}
            </h1>
          </div>

          <div className="max-w-[684px] lg:max-w-[739px]">
            <p
              className="font-body"
              style={{ color: '#D8DCE4', lineHeight: 1.6, fontSize: '1.2292rem' }}
            >
              {hero.subhead.map((segment, i) =>
                segment.emphasis === 'bold-amber' ? (
                  <strong key={i} className="font-semibold text-brand-amber">
                    {segment.text}
                  </strong>
                ) : (
                  <span key={i}>{segment.text}</span>
                )
              )}
            </p>
          </div>

          <div>
            <HeroCta label={hero.ctaLabel} targetId="final-cta" />
          </div>
        </div>
      </div>
    </section>
  );
}
