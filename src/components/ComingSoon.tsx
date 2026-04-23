import { sharedContent as mxShared } from '@/content/mx-es/shared';
import { sharedContent as usShared } from '@/content/us-en/shared';
import { type Locale } from '@/lib/i18n';

const contentByLocale: Record<Locale, typeof mxShared> = {
  'mx-es': mxShared,
  'us-en': usShared,
};

export function ComingSoon({ locale }: { locale: Locale }) {
  const shared = contentByLocale[locale];
  const { comingSoon } = shared;

  return (
    <main className="min-h-screen min-w-0 bg-white flex items-center justify-center px-6 md:px-12 py-16 md:py-24">
      <div className="w-full min-w-0 max-w-[680px] text-center">
        <h2 className="text-h2 font-display text-text-primary break-words">{comingSoon.heading}</h2>
        <div className="h-[3px] w-16 mx-auto my-6 bg-brand-gradient" />
      </div>
    </main>
  );
}
