import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isLocale } from '@/lib/i18n';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== 'us-en') return {};
  return getPageMetadata(locale, 'contact');
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'us-en') notFound();
  return (
    <main>
      <h1>Contact (us-en)</h1>
    </main>
  );
}
