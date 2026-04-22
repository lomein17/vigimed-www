import { notFound } from 'next/navigation';

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
