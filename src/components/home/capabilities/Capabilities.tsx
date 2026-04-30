import { homeContent as mxHome } from '@/content/mx-es/home';
import { homeContent as usHome } from '@/content/us-en/home';
import type { Locale } from '@/lib/i18n';

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

        <div
          className="mx-auto grid grid-cols-1 md:grid-cols-5 gap-4"
          style={{ maxWidth: 1100 }}
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
      </div>

      <div
        aria-hidden="true"
        className="relative z-0 w-full mt-12 lg:mt-16 hidden md:block pointer-events-none"
      >
        <svg
          viewBox="-20 0 1240 80"
          preserveAspectRatio="none"
          className="vm-ecg-svg block w-full"
          style={{ height: 64 }}
        >
          <defs>
            <linearGradient id="ecgPulse" x1="0" x2="1">
              <stop offset="0%" stopColor="#20A2E2" stopOpacity="0" />
              <stop offset="50%" stopColor="#2FBBF7" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#20A2E2" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="vm-ecg-bg"
            d="M -20 50 L 108 50 L 111 56 L 120 12 L 129 56 L 132 50 L 348 50 L 351 56 L 360 12 L 369 56 L 372 50 L 588 50 L 591 56 L 600 12 L 609 56 L 612 50 L 828 50 L 831 56 L 840 12 L 849 56 L 852 50 L 1068 50 L 1071 56 L 1080 12 L 1089 56 L 1092 50 L 1220 50"
            stroke="url(#ecgPulse)"
            strokeOpacity="0.30"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="vm-ecg-sweep"
            pathLength="1000"
            d="M -20 50 L 108 50 L 111 56 L 120 12 L 129 56 L 132 50 L 348 50 L 351 56 L 360 12 L 369 56 L 372 50 L 588 50 L 591 56 L 600 12 L 609 56 L 612 50 L 828 50 L 831 56 L 840 12 L 849 56 L 852 50 L 1068 50 L 1071 56 L 1080 12 L 1089 56 L 1092 50 L 1220 50"
            stroke="url(#ecgPulse)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <circle className="vm-ecg-cursor" r="2.5" fill="#2FBBF7">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path="M -20 50 L 1220 50"
              keyTimes="0;0.05;0.85;1"
              keyPoints="0;0;1;1"
              calcMode="linear"
            />
          </circle>
        </svg>
      </div>
    </section>
  );
}
