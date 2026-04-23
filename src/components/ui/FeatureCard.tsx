import type { LucideIcon } from 'lucide-react';

export function FeatureCard({
  title,
  body,
  icon: Icon,
}: {
  title: string;
  body: string;
  icon: LucideIcon;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 md:min-h-[220px] border-b-2 border-b-transparent hover:border-b-brand-500 transition-[transform,box-shadow,border-color] duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-lg">
      <Icon aria-hidden="true" className="w-10 h-10 text-brand-500" />
      <h3 className="mt-6 text-h3 font-display text-text-primary">{title}</h3>
      <p className="mt-3 text-body text-text-body">{body}</p>
    </div>
  );
}
