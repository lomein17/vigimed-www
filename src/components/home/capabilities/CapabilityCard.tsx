import { CheckCircle2, Eye, FileText, TrendingUp, Zap } from 'lucide-react';

import type { CapabilityIcon } from '@/content/us-en/home';

const iconByKey = {
  Eye,
  CheckCircle2,
  Zap,
  FileText,
  TrendingUp,
} as const satisfies Record<CapabilityIcon, unknown>;

export function CapabilityCard({
  title,
  reveal,
  icon,
}: {
  title: string;
  reveal: string;
  icon: CapabilityIcon;
}) {
  const Icon = iconByKey[icon];
  return (
    <div className="vm-capability-card">
      <div className="vm-capability-back">
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            lineHeight: 1.55,
            color: '#0A1628',
            textAlign: 'center',
          }}
        >
          {reveal}
        </p>
      </div>

      <div className="vm-capability-front">
        <Icon aria-hidden="true" size={36} strokeWidth={1.5} />
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: '-0.01em',
            color: 'inherit',
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          className="vm-capability-front__reveal-mobile"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            lineHeight: 1.55,
            color: '#0A1628',
            textAlign: 'center',
          }}
        >
          {reveal}
        </p>
      </div>
    </div>
  );
}
