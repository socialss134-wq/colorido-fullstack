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

const subCategories = [
  'All', 'Fine Arts', 'Music & Band', 'Dance', 'Choreoday',
  'Dramatics', 'Fashion Show', 'Tekraft Events', 'Literary',
];

const types = ['All', 'Solo', 'Group', 'Individual'];

export default function CulturalPage() {
  const [events, setEvents] = useState<FestEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [subFilter, setSubFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  useEffect(() => {
    getEvents().then((data) => {
      setEvents(data.filter((e) => e.category === 'Cultural'));
      setLoading(false);
    });
  }, []);

  const filtered = events.filter((e) => {
    if (subFilter !== 'All' && e.subCategory !== subFilter) return false;
    if (typeFilter !== 'All' && e.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[hsl(var(--colorido-pink))] via-[hsl(var(--colorido-orange))] to-[hsl(var(--colorido-yellow))] p-8 text-center text-white sm:p-12">
        <div className="absolute inset-0 bg-mesh opacity-20" />
        <div className="relative">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Cultural Events</h1>
          <p className="mt-3 text-lg text-white/80 max-w-2xl mx-auto">
            Express your creativity across music, dance, drama, art, and more
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              {subCategories.map((cat) => (
                <Button
                  key={cat}
                  variant={subFilter === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSubFilter(cat)}
                  className={cn(subFilter === cat && 'bg-gradient-to-r from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white')}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Event Type</p>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <Button
                  key={type}
                  variant={typeFilter === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTypeFilter(type)}
                  className={cn(typeFilter === type && 'bg-gradient-to-r from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white')}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        {loading ? (
          <GridSkeleton count={6} />
        ) : filtered.length === 0 ? (
          <EmptyState title="No events found" message="Try adjusting your filters to see more events." />
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
