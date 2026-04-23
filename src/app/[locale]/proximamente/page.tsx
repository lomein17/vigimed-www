import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ComingSoon } from '@/components/ComingSoon';
import { isLocale } from '@/lib/i18n';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== 'mx-es') return {};
  return getPageMetadata(locale, 'comingSoon');
}

export default async function ProximamentePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'mx-es') notFound();
  return <ComingSoon locale="mx-es" />;
}
