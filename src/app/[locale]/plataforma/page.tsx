import { notFound } from 'next/navigation';

export default async function PlataformaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'mx-es') notFound();
  return (
    <main>
      <h1>Plataforma (mx-es)</h1>
    </main>
  );
}
