import Image from 'next/image';
import Link from 'next/link';

import { sharedContent as mxShared } from '@/content/mx-es/shared';
import { sharedContent as usShared } from '@/content/us-en/shared';
import { hrefFor, type Locale } from '@/lib/i18n';

import { NavMenu } from './NavMenu';

const contentByLocale: Record<Locale, typeof mxShared> = {
  'mx-es': mxShared,
  'us-en': usShared,
};

export function StickyNav({ locale }: { locale: Locale }) {
  const shared = contentByLocale[locale];
  const { primary, drawer, cta } = shared.nav;
  const ctaHref = hrefFor(locale, cta.route);

  return (
    <header className="sticky top-0 z-40 h-[72px] bg-navy-800 border-b border-white/5">
      <div className="h-full px-6 md:px-12 flex items-center justify-between gap-6">
        <Link href={hrefFor(locale, 'home')} className="flex items-center" aria-label="VigiMed">
          <Image
            src="/brand/vigimed-wordmark-on-dark.png"
            alt="VigiMed"
            width={400}
            height={132}
            priority
            className="w-[144px] h-auto"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-3 text-text-on-dark font-ui"
        >
          {primary.map((item, idx) => (
            <span key={item.route} className="flex items-center gap-3">
              {idx > 0 && (
                <span aria-hidden="true" className="text-white/30">
                  ·
                </span>
              )}
              <Link
                href={hrefFor(locale, item.route)}
                className="nav-item text-text-on-dark hover:text-brand-300 transition-colors"
              >
                {item.label}
              </Link>
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={ctaHref}
            className="hidden md:inline-flex items-center justify-center rounded-full bg-brand-500 hover:bg-brand-400 text-text-on-dark font-ui text-button px-5 py-2.5 transition-colors"
          >
            {cta.label}
          </Link>
          <NavMenu
            locale={locale}
            items={drawer}
            cta={{ label: cta.label, href: ctaHref }}
            localeSelector={shared.localeSelector}
          />
        </div>
      </div>
    </header>
  );
}
