import { careersContent as mxCareers } from '@/content/mx-es/careers';
import { careersContent as usCareers } from '@/content/us-en/careers';
import type { Locale } from '@/lib/i18n';

const contentByLocale = {
  'mx-es': mxCareers,
  'us-en': usCareers,
} as const;

export function CareersHero({ locale }: { locale: Locale }) {
  const { hero } = contentByLocale[locale];

  return (
    <section
      aria-labelledby="careers-hero-headline"
      className="bg-navy-900 text-text-on-dark"
    >
      <div className="max-w-[1280px] mx-auto px-gutter pt-20 pb-12 md:pt-28 md:pb-16">
        <p
          className="font-ui text-[12px] font-medium uppercase tracking-[0.18em] text-brand-300"
        >
          {hero.eyebrow}
        </p>
        <h1
          id="careers-hero-headline"
          className="font-display mt-4 max-w-[900px] text-[2.333rem] md:text-[2.833rem] lg:text-[3.583rem] font-medium leading-[1.08] tracking-[-0.015em]"
        >
          {hero.headline}
        </h1>
        <p className="font-body mt-6 max-w-[684px] text-[1.0625rem] md:text-[1.125rem] leading-relaxed text-text-on-dark-muted">
          {hero.subhead}
        </p>
      </div>
    </section>
  );
}
