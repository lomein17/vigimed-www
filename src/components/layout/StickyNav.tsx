import { header as mxHeader } from '@/content/mx-es/header';
import { sharedContent as mxShared } from '@/content/mx-es/shared';
import { header as usHeader } from '@/content/us-en/header';
import { sharedContent as usShared } from '@/content/us-en/shared';
import { hrefFor, type Locale } from '@/lib/i18n';

import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile, type SecondaryNavItem } from './HeaderMobile';
import { StickyNavShell } from './StickyNavShell';

const headerByLocale = {
  'mx-es': mxHeader,
  'us-en': usHeader,
} as const;

const sharedByLocale = {
  'mx-es': mxShared,
  'us-en': usShared,
} as const;

const navOrderByLocale: Record<Locale, readonly string[]> = {
  'mx-es': ['hospitales', 'clinicas', 'laboratorios'],
  'us-en': ['hospitals', 'labs'],
};

// VM-495: surface "About VigiMed" footer links (careers + contact)
// as the drawer's L1 secondary nav. Sourcing labels from shared.ts
// keeps the drawer free of hardcoded locale copy.
function buildSecondaryNav(locale: Locale): readonly SecondaryNavItem[] {
  const aboutColumn = sharedByLocale[locale].footer.columns[1];
  return aboutColumn.links.flatMap<SecondaryNavItem>((item) => {
    if (item.route !== undefined) {
      return [{ label: item.label, href: hrefFor(locale, item.route) }];
    }
    if (item.slug !== undefined) {
      return [{ label: item.label, href: item.slug }];
    }
    return [];
  });
}

export function StickyNav({ locale }: { locale: Locale }) {
  const header = headerByLocale[locale];
  const navOrder = navOrderByLocale[locale];
  const secondaryNav = buildSecondaryNav(locale);

  return (
    <StickyNavShell>
      <HeaderDesktop locale={locale} header={header} navOrder={navOrder} />
      <HeaderMobile
        locale={locale}
        header={header}
        navOrder={navOrder}
        secondaryNav={secondaryNav}
      />
      <div aria-hidden="true" className="relative z-[32] h-[3px] bg-brand-pulse" />
    </StickyNavShell>
  );
}
