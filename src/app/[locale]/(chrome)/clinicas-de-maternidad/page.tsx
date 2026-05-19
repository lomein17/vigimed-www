import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';

import { SegmentChassis } from '@/components/chassis/SegmentChassis';
import { clinicasDeMaternidadFillMxEs } from '@/content/mx-es/segments';
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
    titleSuffix: 'Clínicas de Maternidad',
  });
}

// VM-512 r1: --vm-segment-hero-pos override pushes the mobile hero's
// object-position from the default center center to 10% center, shifting
// the visible portrait-crop strip ~40 percentage points leftward. The
// source plate frames the mother + nurse subjects on the left of the
// 1280×720 frame; with center crop they read as off-center-right on
// portrait. This hook is exposed by .vm-segment-hero-media-mobile in
// globals.css line ~1598. Per-segment override pattern documented in
// the VM-508 mobile-fork comment block.
const clinicasHeroFocalStyle: CSSProperties = {
  '--vm-segment-hero-pos': '10% center',
} as CSSProperties;

export default async function ClinicasDeMaternidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'mx-es') notFound();
  return (
    <div style={clinicasHeroFocalStyle}>
      <SegmentChassis locale="mx-es" fill={clinicasDeMaternidadFillMxEs} />
    </div>
  );
}
