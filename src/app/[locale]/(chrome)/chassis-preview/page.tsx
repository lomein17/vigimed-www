// VM-436 chassis preview route. Dev-only; noindex/nofollow via
// getPlaceholderMetadata. Renders the SegmentChassis with locale-keyed
// fixtures from src/content/{locale}/chassis/.
//
// Schema: src/lib/chassis/slots.ts (ChassisFill)
// Fixtures: src/content/mx-es/chassis/index.ts, src/content/us-en/chassis/index.ts

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SegmentChassis } from '@/components/chassis/SegmentChassis';
import { chassisFixtureMxEs } from '@/content/mx-es/chassis';
import { chassisFixtureUsEn } from '@/content/us-en/chassis';
import { isLocale, type Locale } from '@/lib/i18n';
import { getPlaceholderMetadata } from '@/lib/seo/metadata';

const fixtureByLocale = {
  'mx-es': chassisFixtureMxEs,
  'us-en': chassisFixtureUsEn,
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
