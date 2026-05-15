import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CareersHero } from '@/components/careers/CareersHero';
import { CareersMission } from '@/components/careers/CareersMission';
import { CareersZeroState } from '@/components/careers/CareersZeroState';
import { TalentNetworkForm } from '@/components/careers/TalentNetworkForm';
import { isLocale } from '@/lib/i18n';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== 'mx-es') return {};
  return getPageMetadata(locale, 'careers');
}

export default async function OportunidadesLaboralesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'mx-es') notFound();
  return (
    <main>
      <CareersHero locale={locale} />
      <CareersMission locale={locale} />
      <CareersZeroState locale={locale} />
      <TalentNetworkForm locale={locale} />
    </main>
  );
}
