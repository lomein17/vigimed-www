import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CareersShell } from '@/components/careers/CareersShell';
import { careersContent } from '@/content/us-en/careers';
import { isLocale } from '@/lib/i18n';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== 'us-en') return {};
  return getPageMetadata(locale, 'careers');
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'us-en') notFound();
  return <CareersShell content={careersContent} />;
}
