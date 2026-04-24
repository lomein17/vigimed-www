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
  const { positioning, ctaLabel, ctaMailtoSubject } = shared.comingSoon;
  const mailtoHref = `mailto:hello@vigimed.ai?subject=${encodeURIComponent(ctaMailtoSubject)}`;

  return (
    <main className="min-h-screen min-w-0 bg-white flex items-center justify-center px-6 md:px-12 py-16 md:py-24">
      <div className="w-full min-w-0 max-w-[520px] flex flex-col items-center text-center">
        <Image
          src="/brand/vigimed-wordmark-on-light.png"
          alt="VigiMed"
          width={400}
          height={132}
          priority
          className="w-[144px] h-auto"
        />
        <div aria-hidden="true" className="h-[3px] w-20 my-6 bg-brand-pulse" />
        <p className="text-h3 font-display text-text-primary">{positioning}</p>
        <a
          href={mailtoHref}
          target="_self"
          className="mt-8 inline-flex items-center justify-center h-[38px] px-[18px] rounded-[6px] bg-brand-500 hover:bg-brand-400 text-text-on-dark font-ui text-button border border-[#20A2E2] box-border transition-colors"
        >
          {ctaLabel}
        </a>
      </div>
    </main>
  );
}
