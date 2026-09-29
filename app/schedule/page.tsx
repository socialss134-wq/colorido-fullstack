'use client';

import { useState, useEffect } from 'react';
import { ScheduleTable } from '@/components/schedule/ScheduleTable';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { getSchedule } from '@/lib/api/schedule';
import type { ScheduleItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dayFilter, setDayFilter] = useState('All');
  const [catFilter, setCatFilter] = useState('All');

  useEffect(() => {
    getSchedule().then((data) => {
      setSchedule(data);
      setLoading(false);
    });
  }, []);

  const days = ['All', '1', '2', '3', '4'];
  const categories = ['All', 'Cultural', 'Sports'];

  const filtered = schedule.filter((item) => {
    if (dayFilter !== 'All' && item.day !== Number(dayFilter)) return false;
    if (catFilter !== 'All' && item.category !== catFilter) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[hsl(var(--colorido-pink))] via-[hsl(var(--colorido-orange))] to-[hsl(var(--colorido-yellow))] p-8 text-center text-white sm:p-12">
        <div className="absolute inset-0 bg-mesh opacity-20" />
        <div className="relative">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Event Schedule</h1>
          <p className="mt-3 text-lg text-white/80">March 15-18, 2026 — Four days of action</p>
        </div>
      </section>

      <section className="py-10 space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Day</p>
          <div className="flex flex-wrap gap-2">
            {days.map((d) => (
              <Button
                key={d}
                variant={dayFilter === d ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDayFilter(d)}
                className={cn(dayFilter === d && 'bg-gradient-to-r from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white')}
              >
                {d === 'All' ? 'All Days' : `Day ${d}`}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Button
                key={c}
                variant={catFilter === c ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCatFilter(c)}
                className={cn(catFilter === c && 'bg-gradient-to-r from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white')}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12">
        {loading ? (
          <LoadingState message="Loading schedule..." />
        ) : filtered.length === 0 ? (
          <EmptyState title="No events found" message="Try adjusting your filters." />
        ) : (
          <ScheduleTable items={filtered} />
        )}
      </section>
    </div>
  );
}
