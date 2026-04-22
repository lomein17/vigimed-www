import { notFound } from 'next/navigation';

import { ComingSoon } from '@/components/ComingSoon';

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'us-en') notFound();
  return <ComingSoon locale="us-en" />;
}
