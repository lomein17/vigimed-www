import { homeContent as mxHome } from '@/content/mx-es/home';
import { homeContent as usHome } from '@/content/us-en/home';
import type { Locale } from '@/lib/i18n';

import { CapabilitiesAutoReveal } from './CapabilitiesAutoReveal';
import { CapabilityCard } from './CapabilityCard';

const contentByLocale = {
  'mx-es': mxHome,
  'us-en': usHome,
} as const;

export function Capabilities({ locale }: { locale: Locale }) {
  const { capabilities, placeholderLabel } = contentByLocale[locale];
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <section
      aria-labelledby="capabilities-heading"
      className="vm-capabilities-section relative bg-surface-warm py-section px-gutter overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-surface-warm">
        {isDev && (
          <span className="absolute top-4 right-4 font-mono text-xs text-navy-800/50">
            {placeholderLabel}
          </span>
        )}
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1200 880"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full pointer-events-none"
      >
        <defs>
          <linearGradient id="pulseLine" x1="0" x2="1">
            <stop offset="0%" stopColor="#20A2E2" stopOpacity="0" />
            <stop offset="50%" stopColor="#2FBBF7" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#20A2E2" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 40 440 Q 240 400, 420 445 T 780 440 T 1160 445"
          stroke="url(#pulseLine)"
          strokeWidth={2}
          fill="none"
          opacity={0.85}
        />
      </svg>

      <div className="relative z-10 max-w-content mx-auto">
        <header className="mx-auto text-center flex flex-col gap-4 mb-12">
          <p
            className="font-ui"
            style={{
              color: 'var(--color-brand-500)',
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              lineHeight: 1.4,
            }}
          >
            {capabilities.eyebrow}
          </p>
          <div className="max-w-[780px] mx-auto">
            <h2
              id="capabilities-heading"
              style={{
                fontSize: 'var(--text-h2)',
                letterSpacing: '-0.01em',
                lineHeight: 1.15,
                fontWeight: 500,
                color: '#0A1628',
              }}
            >
              {capabilities.heading}
            </h2>
          </div>
          <div className="max-w-[940px] mx-auto">
            <p
              className="font-body"
              style={{ color: '#2B2B2B', lineHeight: 1.6, fontSize: '1.0625rem' }}
            >
              {capabilities.subhead}
            </p>
          </div>
        </header>

        <CapabilitiesAutoReveal>
          <div
            className="mx-auto grid grid-cols-1 md:grid-cols-5 gap-4"
            style={{ maxWidth: 1184 }}
          >
            {capabilities.cards.map((card) => (
              <CapabilityCard
                key={card.icon}
                title={card.title}
                reveal={card.reveal}
                icon={card.icon}
              />
            ))}
          </div>
        </CapabilitiesAutoReveal>
      </div>
    </section>
  );
}
