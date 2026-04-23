import { FileText, LayoutGrid, ShieldCheck, Video, type LucideIcon } from 'lucide-react';

import { FeatureCard } from '@/components/ui/FeatureCard';
import { homeContent as mxHome } from '@/content/mx-es/home';
import { homeContent as usHome, type HomeIconKey } from '@/content/us-en/home';
import type { Locale } from '@/lib/i18n';

const contentByLocale: Record<Locale, typeof usHome> = {
  'mx-es': mxHome,
  'us-en': usHome,
};

const iconMap: Partial<Record<HomeIconKey, LucideIcon>> = {
  Video,
  LayoutGrid,
  ShieldCheck,
  FileText,
};

export function SolutionOverview({ locale }: { locale: Locale }) {
  const { solution } = contentByLocale[locale];
  return (
    <section className="bg-gray-50 min-h-[80vh]">
      <div className="max-w-content mx-auto px-gutter py-section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solution.cards.map((card) => {
            const Icon = iconMap[card.icon] ?? Video;
            return (
              <FeatureCard key={card.title} title={card.title} body={card.body} icon={Icon} />
            );
          })}
        </div>
      </div>
    </section>
  );
}
