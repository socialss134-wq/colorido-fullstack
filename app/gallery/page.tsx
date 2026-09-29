'use client';

import { useState, useEffect } from 'react';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { getGalleryImages } from '@/lib/api/gallery';
import type { GalleryImage } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = ['All', 'Cultural', 'Sports', 'Behind the Scenes', 'Previous Events'];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    getGalleryImages().then((data) => {
      setImages(data);
      setLoading(false);
    });
  }, []);

  const filtered = images.filter((img) => filter === 'All' || img.category === filter);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[hsl(var(--colorido-pink))] via-[hsl(var(--colorido-orange))] to-[hsl(var(--colorido-yellow))] p-8 text-center text-white sm:p-12">
        <div className="absolute inset-0 bg-mesh opacity-20" />
        <div className="relative">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Gallery</h1>
          <p className="mt-3 text-lg text-white/80">Moments captured from COLORIDO over the years</p>
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
          <LoadingState message="Loading gallery..." />
        ) : filtered.length === 0 ? (
          <EmptyState title="No images found" message="No images in this category yet." />
        ) : (
          <GalleryGrid images={filtered} />
        )}
      </section>
    </div>
  );
}
