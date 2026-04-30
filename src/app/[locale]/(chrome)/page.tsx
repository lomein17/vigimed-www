import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { Hero } from '@/components/home/Hero';
import { Capabilities } from '@/components/home/capabilities/Capabilities';
import { FinalCta } from '@/components/home/final-cta/FinalCta';
import { MoatPlusIntegrations } from '@/components/home/moat-plus-integrations/MoatPlusIntegrations';
import { ProblemInMotion } from '@/components/home/problem-in-motion/ProblemInMotion';
import { isLocale, type Locale } from '@/lib/i18n';
import { SITE_URL } from '@/lib/seo/constants';
import { getPageMetadata } from '@/lib/seo/metadata';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VigiMed',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/vigimed-wordmark-on-dark.png`,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return getPageMetadata(locale, 'home');
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;

  // Pre-launch gate: Production serves ComingSoon until SHOW_HOME=true.
  // Runtime (not build-time) read, so the env value is evaluated per request
  // per Vercel environment. Production has SHOW_HOME=false (or unset);
  // Staging has SHOW_HOME=true and is gated behind Vercel Authentication.
  // Redirect target is the chromeless (bare) route so the header/footer
  // don't leak around a page whose message is "not launched yet."
  if (process.env.SHOW_HOME !== 'true') {
    const comingSoonSlug = typedLocale === 'mx-es' ? 'proximamente' : 'coming-soon';
    redirect(`/${typedLocale}/${comingSoonSlug}`);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero locale={typedLocale} />
      <Capabilities locale={typedLocale} />
      <ProblemInMotion locale={typedLocale} />
      <MoatPlusIntegrations locale={typedLocale} />
      <FinalCta locale={typedLocale} />
    </>
  );
}
