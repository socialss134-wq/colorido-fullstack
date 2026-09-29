import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Sponsor } from '@/lib/types';

const tierConfig = {
  Title: { label: 'Title Sponsor', className: 'from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))]', textClass: 'text-3xl' },
  Platinum: { label: 'Platinum Sponsor', className: 'from-gray-400 to-gray-600', textClass: 'text-2xl' },
  Gold: { label: 'Gold Sponsor', className: 'from-amber-400 to-amber-600', textClass: 'text-2xl' },
  Silver: { label: 'Silver Sponsor', className: 'from-slate-300 to-slate-500', textClass: 'text-xl' },
  Partner: { label: 'Partner', className: 'from-blue-400 to-blue-600', textClass: 'text-xl' },
};

interface SponsorCardProps {
  sponsor: Sponsor;
}

export function SponsorCard({ sponsor }: SponsorCardProps) {
  const tier = tierConfig[sponsor.tier];

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className={cn('flex h-32 items-center justify-center bg-gradient-to-br', tier.className)}>
        <span className={cn('font-display font-bold text-white', tier.textClass)}>
          {sponsor.logo}
        </span>
      </div>
      <div className="p-4 text-center">
        <p className="font-semibold text-sm">{sponsor.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{tier.label}</p>
      </div>
    </Card>
  );
}
