'use client';

import { useState, useEffect } from 'react';
import { EventCard } from '@/components/events/EventCard';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GridSkeleton } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { getEvents } from '@/lib/api/events';
import type { FestEvent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const genders = ['All', 'Boys', 'Girls'];

export default function SportsPage() {
  const [events, setEvents] = useState<FestEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [genderFilter, setGenderFilter] = useState('All');

  useEffect(() => {
    getEvents().then((data) => {
      setEvents(data.filter((e) => e.category === 'Sports'));
      setLoading(false);
    });
  }, []);

  const filtered = events.filter((e) => {
    if (genderFilter !== 'All' && e.gender !== genderFilter) return false;
    return true;
  });

  const boysEvents = filtered.filter((e) => e.gender === 'Boys');
  const girlsEvents = filtered.filter((e) => e.gender === 'Girls');

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[hsl(var(--colorido-blue))] via-[hsl(var(--colorido-green))] to-[hsl(var(--colorido-yellow))] p-8 text-center text-white sm:p-12">
        <div className="absolute inset-0 bg-mesh opacity-20" />
        <div className="relative">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Sports Events</h1>
          <p className="mt-3 text-lg text-white/80 max-w-2xl mx-auto">
            Compete in inter-college tournaments and claim the trophy
          </p>
        </div>
      </section>

      <section className="py-10">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Gender Category</p>
          <div className="flex flex-wrap gap-2">
            {genders.map((g) => (
              <Button
                key={g}
                variant={genderFilter === g ? 'default' : 'outline'}
                size="sm"
                onClick={() => setGenderFilter(g)}
                className={cn(genderFilter === g && 'bg-gradient-to-r from-[hsl(var(--colorido-blue))] to-[hsl(var(--colorido-green))] text-white')}
              >
                {g}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12 space-y-12">
        {loading ? (
          <GridSkeleton count={6} />
        ) : genderFilter === 'All' ? (
          <>
            {boysEvents.length > 0 && (
              <div>
                <SectionHeading title="Boys" centered={false} />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {boysEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}
            {girlsEvents.length > 0 && (
              <div>
                <SectionHeading title="Girls" centered={false} />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {girlsEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : filtered.length === 0 ? (
          <EmptyState title="No events found" message="Try adjusting your filters." />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
