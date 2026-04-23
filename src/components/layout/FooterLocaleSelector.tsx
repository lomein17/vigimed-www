'use client';

import { usePathname } from 'next/navigation';

import { localizedEquivalent, type Locale } from '@/lib/i18n';

interface FooterLocaleSelectorProps {
  locale: Locale;
  heading: string;
  currentLabel: string;
  otherLabel: string;
  otherLocale: Locale;
}

export function FooterLocaleSelector({
  locale,
  heading,
  currentLabel,
  otherLabel,
  otherLocale,
}: FooterLocaleSelectorProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const otherHref = localizedEquivalent(pathname, locale, otherLocale);

  return (
    <div className="font-ui">
      <h3 className="text-small font-semibold text-text-on-dark mb-4">
        {heading}
      </h3>
      <div className="flex items-center gap-2 text-small">
        <span
          className="font-semibold text-text-on-dark"
          aria-current="true"
        >
          {currentLabel}
        </span>
        <span aria-hidden="true" className="text-white/30">
          ·
        </span>
        <a
          href={otherHref}
          className="text-white/55 hover:text-white hover:underline transition-colors"
        >
          {otherLabel}
        </a>
      </div>
    </div>
  );
}
