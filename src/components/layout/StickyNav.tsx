import { header as mxHeader } from '@/content/mx-es/header';
import { header as usHeader } from '@/content/us-en/header';
import type { Locale } from '@/lib/i18n';

import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';

const headerByLocale = {
  'mx-es': mxHeader,
  'us-en': usHeader,
} as const;

const navOrderByLocale: Record<Locale, readonly string[]> = {
  'mx-es': ['hospitales', 'clinicas', 'laboratorios'],
  'us-en': ['hospitals', 'labs'],
};

export function StickyNav({ locale }: { locale: Locale }) {
  const header = headerByLocale[locale];
  const navOrder = navOrderByLocale[locale];

  return (
    <header className="sticky top-0 z-40 bg-navy-800">
      <HeaderDesktop locale={locale} header={header} navOrder={navOrder} />
      <HeaderMobile locale={locale} header={header} navOrder={navOrder} />
      <div aria-hidden="true" className="relative z-[32] h-[3px] bg-brand-pulse" />
    </header>
  );
}
