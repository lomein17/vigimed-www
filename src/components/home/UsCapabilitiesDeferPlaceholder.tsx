import { homeContent } from '@/content/us-en/home';

export function UsCapabilitiesDeferPlaceholder() {
  if (process.env.NODE_ENV !== 'development') return null;
  const label = homeContent.usCapabilitiesDeferLabel;
  if (!label) return null;
  return (
    <div className="bg-surface-warm py-section px-gutter">
      <p className="text-center font-mono text-xs text-navy-800/60">{label}</p>
    </div>
  );
}
