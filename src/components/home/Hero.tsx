import Link from 'next/link';

import { homeContent as mxHome } from '@/content/mx-es/home';
import { homeContent as usHome } from '@/content/us-en/home';
import { hrefFor, type Locale } from '@/lib/i18n';

const contentByLocale = {
  'mx-es': mxHome,
  'us-en': usHome,
} as const;

export function Hero({ locale }: { locale: Locale }) {
  const home = contentByLocale[locale];
  const { hero, placeholderLabel } = home;
  const ctaHref = hrefFor(locale, 'contact');
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <section
      aria-labelledby="hero-headline"
      className="relative w-full overflow-hidden flex items-center md:min-h-[640px] lg:min-h-screen"
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

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,22,40,0.88) 0%, rgba(10,22,40,0.72) 35%, rgba(10,22,40,0.3) 65%, rgba(10,22,40,0.1) 100%)',
        }}
      />

      <div
        className="relative z-10 w-full py-section"
        style={{
          // VM-364: Hero-specific horizontal anchor. Left edge sits in the
          // left third of the composition on desktop (clamped to 240px at
          // wide viewports), scales down to the standard gutter floor on
          // narrow ones. Right padding stays on the global gutter.
          paddingLeft: 'clamp(var(--site-gutter), 15vw, 240px)',
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
              id="hero-headline"
              className="text-text-on-dark text-[2.5rem] md:text-[3rem] lg:text-[3.75rem]"
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

          <div className="max-w-[640px]">
            <p
              className="font-body"
              style={{ color: '#D8DCE4', lineHeight: 1.6, fontSize: '1.0625rem' }}
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
            <Link
              href={ctaHref}
              className="inline-flex items-center h-[44px] px-6 rounded-md bg-brand-500 hover:bg-brand-400 text-text-on-dark font-ui text-button transition-colors"
            >
              {hero.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
