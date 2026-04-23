import type { LucideIcon } from 'lucide-react';

export function StatCard({
  stat,
  label,
  icon: Icon,
}: {
  stat: string;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-8">
      <Icon aria-hidden="true" className="w-10 h-10 text-brand-500" />
      <p className="mt-6 text-stat font-display text-text-primary">{stat}</p>
      <p className="mt-3 text-body text-text-body">{label}</p>
    </div>
  );
}
