import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Hero } from '@/components/home/Hero';
import { CapabilitiesMx } from '@/components/home/capabilities/CapabilitiesMx';
import { UsCapabilitiesDeferPlaceholder } from '@/components/home/UsCapabilitiesDeferPlaceholder';
import { isLocale, type Locale } from '@/lib/i18n';
import { SITE_URL } from '@/lib/seo/constants';
import { getPageMetadata } from '@/lib/seo/metadata';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VigiMed',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/vigimed-wordmark-on-dark.png`,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return getPageMetadata(locale, 'home');
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero locale={typedLocale} />
      {typedLocale === 'mx-es' ? (
        <CapabilitiesMx />
      ) : (
        <UsCapabilitiesDeferPlaceholder />
      )}
    </>
  );
}
