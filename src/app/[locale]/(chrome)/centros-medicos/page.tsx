import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SegmentChassis } from '@/components/chassis/SegmentChassis';
import { centrosMedicosFillMxEs } from '@/content/mx-es/segments';
import { isLocale } from '@/lib/i18n';
import { getPlaceholderMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== 'mx-es') return {};
  return getPlaceholderMetadata(locale, {
    isPlaceholder: false,
    titleSuffix: 'Centros Médicos',
  });
}

export default async function CentrosMedicosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'mx-es') notFound();
  return <SegmentChassis locale="mx-es" fill={centrosMedicosFillMxEs} />;
}
