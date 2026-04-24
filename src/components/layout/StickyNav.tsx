import Image from 'next/image';
import Link from 'next/link';

import { sharedContent as mxShared } from '@/content/mx-es/shared';
import {
  sharedContent as usShared,
  type MarketSegmentIcon,
} from '@/content/us-en/shared';
import { hrefFor, type Locale } from '@/lib/i18n';

import { NavMenu } from './NavMenu';

const contentByLocale: Record<Locale, typeof mxShared> = {
  'mx-es': mxShared,
  'us-en': usShared,
};

function MarketSegmentGlyph({ icon }: { icon: MarketSegmentIcon }) {
  const common = {
    'aria-hidden': true,
    viewBox: '0 0 20 20',
    width: 14,
    height: 14,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (icon === 'hospital') {
    return (
      <svg {...common}>
        <path d="M3 17V7l7-4 7 4v10" />
        <path d="M3 17h14" />
        <path d="M10 8.5v4M8 10.5h4" />
      </svg>
    );
  }
  if (icon === 'clinic') {
    return (
      <svg {...common}>
        <circle cx="10" cy="10" r="7.5" />
        <path d="M10 6v8M6 10h8" />
      </svg>
    );
  }
  // lab
  return (
    <svg {...common}>
      <path d="M8 3h4" />
      <path d="M8.5 3v5L4.3 15.8a1 1 0 0 0 .9 1.5h9.6a1 1 0 0 0 .9-1.5L11.5 8V3" />
    </svg>
  );
}

function CaretDown() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      width={10}
      height={10}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4.5 6 7.5 9 4.5" />
    </svg>
  );
}

export function StickyNav({ locale }: { locale: Locale }) {
  const shared = contentByLocale[locale];
  const { marketSegments, contactCta, demoCta, drawer } = shared.nav;
  const contactHref = hrefFor(locale, contactCta.route);
  const demoHref = hrefFor(locale, demoCta.route);

  return (
    <header className="sticky top-0 z-40 bg-navy-800">
      <div className="h-[72px] px-6 md:px-12 flex items-center justify-between gap-6">
        <Link
          href={hrefFor(locale, 'home')}
          className="flex items-center"
          aria-label="VigiMed"
        >
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
          aria-label="Market segments"
          className="hidden md:flex items-center gap-6 text-text-on-dark font-ui"
        >
          {marketSegments.map((item) => (
            <Link
              key={item.icon}
              href={hrefFor(locale, item.route)}
              className="nav-item inline-flex items-center gap-2 text-text-on-dark hover:text-brand-300 transition-colors"
            >
              <MarketSegmentGlyph icon={item.icon} />
              <span>{item.label}</span>
              <CaretDown />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={contactHref}
            className="hidden sm:inline-flex items-center justify-center h-[38px] px-[18px] rounded-md border border-white box-border font-ui text-button text-text-on-dark hover:bg-white/10 transition-colors"
          >
            {contactCta.label}
          </Link>
          <Link
            href={demoHref}
            className="inline-flex items-center justify-center h-[38px] px-[18px] rounded-md border border-brand-500 bg-brand-500 hover:bg-brand-400 hover:border-brand-400 box-border font-ui text-button text-text-on-dark transition-colors"
          >
            {demoCta.label}
          </Link>
          <NavMenu
            locale={locale}
            items={drawer}
            cta={{ label: demoCta.label, href: demoHref }}
            localeSelector={shared.localeSelector}
          />
        </div>
      </div>
      <div aria-hidden="true" className="h-[3px] bg-brand-pulse" />
    </header>
  );
}
