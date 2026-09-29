'use client';

import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Countdown } from '@/components/shared/Countdown';
import { FEST_CONFIG, COUNTDOWN_DATE } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-mesh">
      <div className="absolute inset-0 hero-gradient-soft" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              College Cultural & Sports Fest 2026
            </div>

            <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient">COLORIDO</span>
              <br />
              <span className="text-foreground">2K26</span>
            </h1>

            <p className="mt-4 font-display text-xl font-semibold text-foreground/80 sm:text-2xl">
              {FEST_CONFIG.tagline}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-4 lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                March 15-18, 2026
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {FEST_CONFIG.venue}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button asChild size="lg" className="bg-gradient-to-r from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white">
                <Link href="/registration">
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/cultural">Explore Events</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] opacity-20 blur-2xl animate-float" />
              <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-gradient-to-br from-[hsl(var(--colorido-blue))] to-[hsl(var(--colorido-green))] opacity-20 blur-2xl animate-float-delayed" />
              <div className="relative rounded-3xl bg-gradient-to-br from-[hsl(var(--colorido-pink))] via-[hsl(var(--colorido-orange))] to-[hsl(var(--colorido-yellow))] p-8 shadow-2xl">
                <div className="rounded-2xl bg-white/95 p-6 backdrop-blur">
                  <p className="text-center text-sm font-medium text-muted-foreground mb-4">
                    Fest Begins In
                  </p>
                  <Countdown targetDate={COUNTDOWN_DATE} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
