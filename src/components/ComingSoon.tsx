import Image from 'next/image';

import { sharedContent as mxShared } from '@/content/mx-es/shared';
import { sharedContent as usShared } from '@/content/us-en/shared';
import { type Locale } from '@/lib/i18n';

const contentByLocale: Record<Locale, typeof mxShared> = {
  'mx-es': mxShared,
  'us-en': usShared,
};

export function ComingSoon({ locale }: { locale: Locale }) {
  const shared = contentByLocale[locale];
  const { comingSoon, tagline } = shared;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-[72px] bg-navy-800 flex items-center justify-start px-6 md:px-12">
        <Image
          src="/brand/vigimed-wordmark-on-dark.png"
          alt="VigiMed"
          width={400}
          height={132}
          priority
          className="w-[144px] h-auto"
        />
      </header>

      <main className="flex-1 min-w-0 bg-white flex items-center justify-center px-6 md:px-12 py-16 md:py-24">
        <div className="w-full min-w-0 max-w-[680px] text-center">
          <h2 className="text-h2 font-display text-text-primary break-words">{comingSoon.heading}</h2>
          <div className="h-[3px] w-16 mx-auto my-6 bg-brand-gradient" />
        </div>
      </main>

      <footer className="bg-navy-900 text-text-on-dark-muted px-6 md:px-12 py-8 grid grid-cols-1 sm:grid-cols-3 items-center gap-3 text-small font-ui">
        <p className="text-center sm:col-start-2">{tagline}</p>
        <span className="sm:text-right sm:col-start-3">© 2026 VigiMed</span>
      </footer>
    </div>
  );
}
