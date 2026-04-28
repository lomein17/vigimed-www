import Link from 'next/link';

import { sharedContent as mxShared } from '@/content/mx-es/shared';
import { sharedContent as usShared } from '@/content/us-en/shared';
import { hrefFor, type Locale } from '@/lib/i18n';

import { CountryPicker } from './CountryPicker';

const contentByLocale: Record<Locale, typeof mxShared> = {
  'mx-es': mxShared,
  'us-en': usShared,
};

export function Footer({ locale }: { locale: Locale }) {
  const shared = contentByLocale[locale];
  const { columns, copyright, legalLinks } = shared.footer;

  return (
    <footer className="bg-navy-900 text-text-on-dark">
      <div className="brand-line" aria-hidden="true" />
      <div className="max-w-[1280px] mx-auto px-gutter pt-12 pb-6 md:pt-16 md:pb-8 font-ui">
        <div className="flex flex-col gap-8 md:flex-row md:justify-end md:gap-24">
          {columns.map((col) => (
            <nav
              key={col.heading}
              aria-label={col.heading}
              className="md:min-w-[200px]"
            >
              <h2 className="text-[12px] md:text-[13px] font-medium tracking-[0.04em] uppercase text-text-on-dark text-right mb-4 md:mb-5">
                {col.heading}
              </h2>
              <ul className="flex flex-col gap-2.5 md:gap-3 text-right text-[13px] md:text-sm">
                {col.links.map((item) => (
                  <li key={item.label}>
                    {item.route !== undefined ? (
                      <Link
                        href={hrefFor(locale, item.route)}
                        className="text-text-on-dark-muted hover:text-brand-500 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-text-on-dark-muted">
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="h-[3px] bg-brand-pulse mt-12 mb-5 md:mt-16 md:mb-6"
        />

        <div className="flex flex-col gap-3 text-left text-[11px] md:grid md:grid-cols-3 md:items-end md:gap-4 md:text-xs text-text-on-dark-muted">
          <p className="md:text-left">
            {copyright.prefix}
            <br className="md:hidden" />
            {' '}
            {copyright.suffix}
          </p>
          <p className="md:text-center">
            <span>{legalLinks[0].label}</span>
            <span aria-hidden="true" className="text-white/30 px-2">
              |
            </span>
            <span>{legalLinks[1].label}</span>
          </p>
          <div className="md:flex md:justify-end">
            <CountryPicker
              locale={locale}
              currentLabel={shared.localeSelector.currentLabel}
              otherLabel={shared.localeSelector.otherLabel}
              otherLocale={shared.localeSelector.otherLocale}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
