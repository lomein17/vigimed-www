import Image from 'next/image';
import Link from 'next/link';

import { sharedContent as mxShared } from '@/content/mx-es/shared';
import { sharedContent as usShared } from '@/content/us-en/shared';
import { localeConfig, type Locale } from '@/lib/i18n';

const contentByLocale: Record<Locale, typeof mxShared> = {
  'mx-es': mxShared,
  'us-en': usShared,
};

export function ComingSoon({ locale }: { locale: Locale }) {
  const shared = contentByLocale[locale];
  const { comingSoon, tagline } = shared;
  const country = localeConfig[locale].country;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-[72px] bg-navy-800 flex items-center justify-between px-6 md:px-12">
        <Image
          src="/brand/vigimed-wordmark-on-dark.png"
          alt="VigiMed"
          width={400}
          height={132}
          priority
          className="w-[144px] h-auto"
        />
        <span className="text-[11px] tracking-[0.1em] uppercase text-text-on-dark-muted border border-white/15 px-3 py-1.5 rounded-full font-ui">
          {country}
        </span>
      </header>

      <main className="flex-1 min-w-0 bg-white flex items-center justify-center px-6 md:px-12 py-16 md:py-24">
        <div className="w-full min-w-0 max-w-[680px] text-center">
          <h2 className="text-h2 font-display text-text-primary break-words">{comingSoon.heading}</h2>
          <div className="h-[3px] w-16 mx-auto my-6 bg-amber-gradient" />
          <p className="text-body font-body text-text-body max-w-[560px] mx-auto">{comingSoon.body}</p>
          <div className="mt-9 flex justify-center">
            <Link
              href={`/${locale}/`}
              className="text-button font-ui bg-amber-500 text-text-on-dark px-7 py-3.5 rounded-full hover:bg-amber-400 transition-colors inline-block text-center"
            >
              {comingSoon.cta}
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-navy-900 text-text-on-dark-muted px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-small font-ui">
        <span className="font-display font-bold text-text-on-dark">vigimed.ai</span>
        <p className="text-center">{tagline}</p>
        <span>© 2026 VigiMed</span>
      </footer>
    </div>
  );
}
