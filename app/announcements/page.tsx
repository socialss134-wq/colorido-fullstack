'use client';

import { useState, useEffect } from 'react';
import { AnnouncementCard } from '@/components/announcements/AnnouncementCard';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { getAnnouncements } from '@/lib/api/announcements';
import type { Announcement } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = ['All', 'General', 'Cultural', 'Sports', 'Registration', 'Important'];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    getAnnouncements().then((data) => {
      setAnnouncements(data);
      setLoading(false);
    });
  }, []);

  const filtered = announcements.filter((a) => filter === 'All' || a.category === filter);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[hsl(var(--colorido-pink))] via-[hsl(var(--colorido-orange))] to-[hsl(var(--colorido-yellow))] p-8 text-center text-white sm:p-12">
        <div className="absolute inset-0 bg-mesh opacity-20" />
        <div className="relative">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Announcements</h1>
          <p className="mt-3 text-lg text-white/80">Stay updated with the latest news and notifications</p>
        </div>
      </section>

      <section className="py-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(cat)}
              className={cn(filter === cat && 'bg-gradient-to-r from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white')}
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      <section className="pb-12">
        {loading ? (
          <LoadingState message="Loading announcements..." />
        ) : filtered.length === 0 ? (
          <EmptyState title="No announcements" message="There are no announcements in this category yet." />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <AnnouncementCard key={a.id} announcement={a} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
