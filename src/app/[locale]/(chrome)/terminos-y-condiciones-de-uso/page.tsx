import fs from 'node:fs';
import path from 'node:path';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LegalDocument } from '@/components/legal/LegalDocument';

const source = fs.readFileSync(
  path.join(
    process.cwd(),
    'src/content/mx-es/legal/terminos-y-condiciones-de-uso.md',
  ),
  'utf8',
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'mx-es') return {};
  return {
    title: 'Términos y Condiciones de Uso | VigiMed',
    description:
      'Términos y Condiciones de Uso que rigen el acceso y la navegación del sitio público de VigiMed México, S. de R. L. de C.V. en vigimed.ai.',
  };
}

export default async function TerminosYCondicionesDeUsoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'mx-es') notFound();
  return (
    <main>
      <LegalDocument source={source} lang="es" />
    </main>
  );
}
