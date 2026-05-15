import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CareersShell } from '@/components/careers/CareersShell';
import { careersContent } from '@/content/mx-es/careers';
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
  return <CareersShell content={careersContent} />;
}
