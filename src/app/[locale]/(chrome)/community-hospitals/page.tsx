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
  if (!isLocale(locale) || locale !== 'us-en') return {};
  return getPlaceholderMetadata(locale, {
    isPlaceholder,
    titleSuffix: 'Community Hospitals',
  });
}

export default async function CommunityHospitalsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'us-en') notFound();
  return <PlaceholderBody locale={locale} />;
}
