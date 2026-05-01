import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PlaceholderBody } from '@/components/PlaceholderBody';
import { isLocale } from '@/lib/i18n';
import { getPlaceholderMetadata } from '@/lib/seo/metadata';

const isPlaceholder = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== 'mx-es') return {};
  return getPlaceholderMetadata(locale, {
    isPlaceholder,
    titleSuffix: 'Laboratorios Clínicos',
  });
}

export default async function LaboratoriosClinicosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'mx-es') notFound();
  return <PlaceholderBody locale={locale} />;
}
