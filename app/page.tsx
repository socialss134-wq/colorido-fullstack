export const dynamic = 'force-dynamic';
import { Hero } from '@/components/shared/Hero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { EventCategoryCard } from '@/components/events/EventCategoryCard';
import { EventCard } from '@/components/events/EventCard';
import { AnnouncementCard } from '@/components/announcements/AnnouncementCard';
import { ResultCard } from '@/components/results/ResultCard';
import { SponsorCard } from '@/components/sponsors/SponsorCard';
import { Countdown } from '@/components/shared/Countdown';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getFeaturedEvents } from '@/lib/api/events';
import { getLatestAnnouncements } from '@/lib/api/announcements';
import { getLatestResults } from '@/lib/api/results';
import { getSponsors } from '@/lib/api/sponsors';
import { getGalleryImages } from '@/lib/api/gallery';
import { FEST_CONFIG, COUNTDOWN_DATE } from '@/lib/constants';
import { Palette, Trophy, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  const [featuredEvents, latestAnnouncements, latestResults, sponsors, galleryImages] = await Promise.all([
    getFeaturedEvents(),
    getLatestAnnouncements(3),
    getLatestResults(4),
    getSponsors(),
    getGalleryImages(),
  ]);

  return (
    <>
      <Hero />

      {/* About Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading title="About COLORIDO" subtitle="A celebration of talent, creativity, and sportsmanship" centered={false} />
            <p className="text-base text-muted-foreground leading-relaxed">
              COLORIDO 2K26 is the flagship cultural and sports fest of {FEST_CONFIG.college}.
              Spanning four action-packed days, the festival brings together students from across
              the region to compete in a diverse range of cultural events and sports tournaments.
              From music and dance to basketball and volleyball, COLORIDO is where talent meets the spotlight.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/about">Learn More <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 text-center bg-gradient-to-br from-[hsl(var(--colorido-pink))]/5 to-[hsl(var(--colorido-orange))]/5">
              <p className="font-display text-4xl font-bold text-gradient">20+</p>
              <p className="text-sm text-muted-foreground mt-1">Events</p>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-[hsl(var(--colorido-blue))]/5 to-[hsl(var(--colorido-green))]/5">
              <p className="font-display text-4xl font-bold text-gradient-blue">4</p>
              <p className="text-sm text-muted-foreground mt-1">Days of Fest</p>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-[hsl(var(--colorido-yellow))]/5 to-[hsl(var(--colorido-orange))]/5">
              <p className="font-display text-4xl font-bold text-gradient">500+</p>
              <p className="text-sm text-muted-foreground mt-1">Participants</p>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-[hsl(var(--colorido-green))]/5 to-[hsl(var(--colorido-blue))]/5">
              <p className="font-display text-4xl font-bold text-gradient-blue">15+</p>
              <p className="text-sm text-muted-foreground mt-1">Colleges</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading title="Event Categories" subtitle="Two worlds of competition, one unforgettable fest" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <EventCategoryCard
            title="CULTURAL"
            description="Music, dance, drama, fashion, fine arts, literary events and more. Express your creativity on the grandest stage."
            href="/cultural"
            icon={<Palette className="h-8 w-8" />}
            gradient="from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))]"
          />
          <EventCategoryCard
            title="SPORTS"
            description="Basketball, volleyball, table tennis, throwball, tennikoit. Compete with the best and claim the trophy."
            href="/sports"
            icon={<Trophy className="h-8 w-8" />}
            gradient="from-[hsl(var(--colorido-blue))] to-[hsl(var(--colorido-green))]"
          />
        </div>
      </section>

      {/* Featured Events */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading title="Featured Events" subtitle="Don't miss these highlights of COLORIDO 2K26" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Countdown */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 hero-gradient opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Countdown to COLORIDO 2K26" subtitle="The excitement begins in" />
          <Countdown targetDate={COUNTDOWN_DATE} />
        </div>
      </section>

      {/* Announcements */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <SectionHeading title="Latest Announcements" centered={false} className="mb-0" />
          <Button asChild variant="outline" size="sm">
            <Link href="/announcements">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestAnnouncements.map((a) => (
            <AnnouncementCard key={a.id} announcement={a} />
          ))}
        </div>
      </section>

      {/* Results Preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <SectionHeading title="Recent Results" centered={false} className="mb-0" />
          <Button asChild variant="outline" size="sm">
            <Link href="/results">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {latestResults.map((r) => (
            <ResultCard key={r.id} result={r} />
          ))}
        </div>
      </section>

      {/* Sponsors */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading title="Our Sponsors" subtitle="Powered by our amazing partners" />
        <div className="flex flex-wrap items-center justify-center gap-6">
          {sponsors.slice(0, 6).map((s) => (
            <div key={s.id} className="flex h-20 w-32 items-center justify-center rounded-xl border bg-card shadow-sm">
              <span className="font-display text-xl font-bold text-muted-foreground">{s.logo}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Button asChild variant="outline">
            <Link href="/sponsors">View All Sponsors <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <SectionHeading title="Gallery Preview" centered={false} className="mb-0" />
          <Button asChild variant="outline" size="sm">
            <Link href="/gallery">View Gallery <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {galleryImages.slice(0, 8).map((img) => (
            <div key={img.id} className="group relative overflow-hidden rounded-xl aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Sparkles className="mx-auto h-12 w-12 text-white" />
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-5xl">
            Ready to be part of COLORIDO 2K26?
          </h2>
          <p className="mt-3 text-lg text-white/80 max-w-2xl mx-auto">
            Register now and secure your spot in the most exciting college fest of the year.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/registration">Register Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-primary hover:bg-white/10 hover:text-white">
              <Link href="/cultural">Explore Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
