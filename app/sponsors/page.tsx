import { SponsorCard } from '@/components/sponsors/SponsorCard';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { getSponsors } from '@/lib/api/sponsors';
import { cn } from '@/lib/utils';
import type { Sponsor } from '@/lib/types';

const tierOrder: Sponsor['tier'][] = ['Title', 'Platinum', 'Gold', 'Silver', 'Partner'];

export default async function SponsorsPage() {
  const sponsors = await getSponsors();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[hsl(var(--colorido-pink))] via-[hsl(var(--colorido-orange))] to-[hsl(var(--colorido-yellow))] p-8 text-center text-white sm:p-12">
        <div className="absolute inset-0 bg-mesh opacity-20" />
        <div className="relative">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Our Sponsors</h1>
          <p className="mt-3 text-lg text-white/80">The partners who make COLORIDO 2K26 possible</p>
        </div>
      </section>

      <div className="py-12 space-y-16">
        {tierOrder.map((tier) => {
          const tierSponsors = sponsors.filter((s) => s.tier === tier);
          if (tierSponsors.length === 0) return null;
          return (
            <section key={tier}>
              <SectionHeading title={`${tier} ${tier === 'Title' ? 'Sponsor' : 'Sponsors'}`} />
              <div className={cn(
                'grid grid-cols-1 gap-6',
                tier === 'Title' && 'sm:grid-cols-1 max-w-md mx-auto',
                tier === 'Platinum' && 'sm:grid-cols-2',
                tier === 'Gold' && 'sm:grid-cols-2 lg:grid-cols-3',
                tier === 'Silver' && 'sm:grid-cols-2 lg:grid-cols-3',
                tier === 'Partner' && 'sm:grid-cols-2 lg:grid-cols-4',
              )}>
                {tierSponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
