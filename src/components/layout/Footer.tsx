import Link from 'next/link';

import { sharedContent as mxShared } from '@/content/mx-es/shared';
import { sharedContent as usShared } from '@/content/us-en/shared';
import { hrefFor, type Locale } from '@/lib/i18n';

import { FooterLocaleSelector } from './FooterLocaleSelector';

const contentByLocale: Record<Locale, typeof mxShared> = {
  'mx-es': mxShared,
  'us-en': usShared,
};

const localeHeading: Record<Locale, string> = {
  'mx-es': 'Idioma',
  'us-en': 'Language',
};

export function Footer({ locale }: { locale: Locale }) {
  const shared = contentByLocale[locale];
  const { columns, copyright, privacyLabel } = shared.footer;
  // Privacy policy has no dedicated route yet; it shares the coming-soon slug
  // via the whyVigimed RouteKey until a real legal route exists.
  const privacyHref = hrefFor(locale, 'whyVigimed');

  return (
    <footer className="bg-navy-900 text-text-on-dark">
      <div className="brand-line" aria-hidden="true" />
      <div className="max-w-content mx-auto px-gutter py-section grid grid-cols-1 md:grid-cols-4 gap-8 font-ui">
        {columns.map((col) => (
          <div key={col.heading}>
            <h3 className="text-small font-semibold text-text-on-dark mb-4">
              {col.heading}
            </h3>
            <ul className="flex flex-col gap-2 text-small">
              {col.links.map((link) => (
                <li key={link.label}>
                  {'route' in link ? (
                    <Link
                      href={hrefFor(locale, link.route)}
                      className="text-text-on-dark-muted hover:text-brand-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-text-on-dark-muted hover:text-brand-300 transition-colors"
                      {...(link.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <FooterLocaleSelector
          locale={locale}
          heading={localeHeading[locale]}
          currentLabel={shared.localeSelector.currentLabel}
          otherLabel={shared.localeSelector.otherLabel}
          otherLocale={shared.localeSelector.otherLocale}
        />
      </div>
      <div className="max-w-content mx-auto px-gutter">
        <div className="border-t border-white/10 mt-12 pt-6 pb-8 flex items-center justify-center gap-3 text-small text-white/60 font-ui">
          <span>{copyright}</span>
          <span aria-hidden="true" className="text-white/30">
            |
          </span>
          <Link
            href={privacyHref}
            className="hover:text-white hover:underline transition-colors"
          >
            {privacyLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
