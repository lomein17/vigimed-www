import Link from 'next/link';

import { sharedContent as mxShared } from '@/content/mx-es/shared';
import { sharedContent as usShared } from '@/content/us-en/shared';
import { getLiveLocales, hrefFor, type Locale } from '@/lib/i18n';

import { CountryPicker } from './CountryPicker';

const contentByLocale: Record<Locale, typeof mxShared> = {
  'mx-es': mxShared,
  'us-en': usShared,
};

export function Footer({ locale }: { locale: Locale }) {
  const shared = contentByLocale[locale];
  const { columns, copyright, legalLinks } = shared.footer;
  const live = getLiveLocales();
  const showLocaleToggle = (live as readonly string[]).includes(shared.localeSelector.otherLocale);

  return (
    <footer data-site-footer className="bg-navy-900 text-text-on-dark">
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
                    ) : item.slug !== undefined ? (
                      item.slug.includes('#') ? (
                        <a
                          href={item.slug}
                          className="text-text-on-dark-muted hover:text-brand-500 transition-colors"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.slug}
                          className="text-text-on-dark-muted hover:text-brand-500 transition-colors"
                        >
                          {item.label}
                        </Link>
                      )
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

        <div className="flex flex-col gap-3 text-left text-[11px] md:flex md:flex-row md:items-end md:gap-4 md:text-xs text-text-on-dark-muted">
          <p>
            {copyright.prefix}
            <br className="md:hidden" />
            {' '}
            {copyright.suffix}
          </p>
          <p className="md:mx-auto md:text-center">
            {legalLinks[0].slug !== undefined ? (
              <Link
                href={legalLinks[0].slug}
                className="text-text-on-dark-muted hover:text-brand-500 transition-colors"
              >
                {legalLinks[0].label}
              </Link>
            ) : (
              <span className="text-text-on-dark-muted">{legalLinks[0].label}</span>
            )}
            <span aria-hidden="true" className="text-white/30 px-2">
              |
            </span>
            {legalLinks[1].slug !== undefined ? (
              <Link
                href={legalLinks[1].slug}
                className="text-text-on-dark-muted hover:text-brand-500 transition-colors"
              >
                {legalLinks[1].label}
              </Link>
            ) : (
              <span className="text-text-on-dark-muted">{legalLinks[1].label}</span>
            )}
          </p>
          <div>
            {showLocaleToggle ? (
              <CountryPicker
                locale={locale}
                currentLabel={shared.localeSelector.currentLabel}
                otherLabel={shared.localeSelector.otherLabel}
                otherLocale={shared.localeSelector.otherLocale}
              />
            ) : (
              // Locked-locale environments (e.g. production with
              // LIVE_LOCALES=mx-es) render the current-locale label only.
              // Skipping the client CountryPicker keeps the off-locale
              // label and route code out of the RSC payload.
              <div className="font-ui inline-flex items-end h-9">
                <span className="text-[11px] md:text-xs text-text-on-dark-muted">
                  {shared.localeSelector.currentLabel}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
