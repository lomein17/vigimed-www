// Public Hospitals MX segment page. mx-es-only per Site Architecture
// parity rule: us-en requests fall through to notFound(). Renders the
// universal SegmentChassis with the Public Hospitals MX fill from
// src/content/mx-es/segments/hospitales-publicos.ts. Hero (VM-403) and
// Final CTA (VM-407) are locked content; Sections 2/3/4 and FAQ Zone A
// are placeholders that VM-438 fills with the live content lock.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SegmentChassis } from '@/components/chassis/SegmentChassis';
import { hospitalesPublicosFillMxEs } from '@/content/mx-es/segments';
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
    titleSuffix: 'Hospitales Públicos',
  });
}

export default async function HospitalesPublicosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'mx-es') notFound();
  return (
    <SegmentChassis locale="mx-es" fill={hospitalesPublicosFillMxEs} />
  );
}
