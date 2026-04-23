import { ClipboardList, Clock, DollarSign, Eye, type LucideIcon } from 'lucide-react';

import { StatCard } from '@/components/ui/StatCard';
import { homeContent as mxHome } from '@/content/mx-es/home';
import { homeContent as usHome, type HomeIconKey } from '@/content/us-en/home';
import type { Locale } from '@/lib/i18n';

const contentByLocale: Record<Locale, typeof usHome> = {
  'mx-es': mxHome,
  'us-en': usHome,
};

const iconMap: Partial<Record<HomeIconKey, LucideIcon>> = {
  ClipboardList,
  Eye,
  Clock,
  DollarSign,
};

export function ProblemStatement({ locale }: { locale: Locale }) {
  const { problem } = contentByLocale[locale];
  return (
    <section className="bg-white min-h-[60vh]">
      <div className="max-w-content mx-auto px-gutter py-section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problem.cards.map((card) => {
            const Icon = iconMap[card.icon] ?? ClipboardList;
            return (
              <StatCard key={card.label} stat={card.stat} label={card.label} icon={Icon} />
            );
          })}
        </div>
      </div>
    </section>
  );
}
