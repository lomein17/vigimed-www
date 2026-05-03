// Chassis preview route. Dev-only; noindex/nofollow via
// getPlaceholderMetadata. Renders the SegmentChassis with locale-keyed
// per-segment fills. Currently fronts the Public Hospitals MX fixture
// for both locales; future segment fills mount here as they land.
//
// Schema: src/lib/chassis/slots.ts (ChassisFill)
// Fixtures: src/content/{locale}/segments/hospitales-publicos.ts

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SegmentChassis } from '@/components/chassis/SegmentChassis';
import { hospitalesPublicosFillMxEs } from '@/content/mx-es/segments';
import { hospitalesPublicosFillUsEn } from '@/content/us-en/segments';
import { isLocale, type Locale } from '@/lib/i18n';
import { getPlaceholderMetadata } from '@/lib/seo/metadata';

const fixtureByLocale = {
  'mx-es': hospitalesPublicosFillMxEs,
  'us-en': hospitalesPublicosFillUsEn,
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return getPlaceholderMetadata(locale, {
    isPlaceholder: true,
    titleSuffix: 'Chassis preview',
  });
}

export default async function ChassisPreviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;

  return (
    <SegmentChassis
      locale={typedLocale}
      fill={fixtureByLocale[typedLocale]}
    />
  );
}
