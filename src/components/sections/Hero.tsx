import { homeContent as mxHome } from '@/content/mx-es/home';
import { homeContent as usHome } from '@/content/us-en/home';
import { PillButton } from '@/components/ui/PillButton';
import { hrefFor, type Locale } from '@/lib/i18n';

const contentByLocale: Record<Locale, typeof usHome> = {
  'mx-es': mxHome,
  'us-en': usHome,
};

export function Hero({ locale }: { locale: Locale }) {
  const { hero } = contentByLocale[locale];
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-navy-900 to-navy-800 pt-[72px]">
      <div aria-hidden="true" className="brand-line absolute inset-x-0 top-0" />
      <div className="max-w-content mx-auto px-gutter min-h-[calc(100vh-72px)] flex items-center">
        <div className="max-w-[580px]">
          <div className="eyebrow text-text-on-dark-muted">{hero.eyebrow}</div>
          <h1 className="mt-6 text-h1 font-display text-text-on-dark">{hero.headline}</h1>
          <p className="mt-6 text-body text-text-on-dark/90">{hero.subhead}</p>
          <div className="mt-10">
            <PillButton href={hrefFor(locale, 'contact')}>{hero.cta}</PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
