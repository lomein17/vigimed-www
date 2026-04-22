import { notFound } from 'next/navigation';

import { ComingSoon } from '@/components/ComingSoon';

export default async function ProximamentePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'mx-es') notFound();
  return <ComingSoon locale="mx-es" />;
}
