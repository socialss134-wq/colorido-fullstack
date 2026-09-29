import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FEST_CONFIG } from '@/lib/constants';
import { Eye, Target, Sparkles, Palette, Trophy, Users, Calendar, Award } from 'lucide-react';

const values = [
  { icon: Eye, title: 'Vision', text: 'To create a platform where every student discovers and showcases their unique talents, fostering a culture of creativity and excellence.' },
  { icon: Target, title: 'Mission', text: 'To organize a world-class cultural and sports fest that brings together diverse talents, promotes healthy competition, and creates lasting memories.' },
  { icon: Sparkles, title: 'What is COLORIDO?', text: 'COLORIDO — meaning "colorful" — is our annual cultural and sports fest. It is a celebration of the vibrant spirit of college life, where students from all backgrounds come together to compete, perform, and celebrate.' },
];

const celebrations = [
  { icon: Palette, title: 'Cultural Celebration', text: 'From music and dance to drama and fashion, COLORIDO showcases the finest artistic talents across multiple categories including fine arts, literary events, and tech innovation.', gradient: 'from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))]' },
  { icon: Trophy, title: 'Sports Celebration', text: 'Inter-college tournaments in basketball, volleyball, table tennis, throwball, and tennikoit bring out the best of athletic talent and team spirit.', gradient: 'from-[hsl(var(--colorido-blue))] to-[hsl(var(--colorido-green))]' },
];

const reasons = [
  { icon: Users, title: 'Meet New People', text: 'Connect with 500+ participants from 15+ colleges across the region.' },
  { icon: Trophy, title: 'Win Exciting Prizes', text: 'Cash prizes, trophies, and certificates for winners in every category.' },
  { icon: Calendar, title: '4 Days of Fun', text: 'Four packed days of events, performances, and unforgettable memories.' },
  { icon: Award, title: 'Build Your Resume', text: 'Participation and wins add value to your academic and professional profile.' },
];

const committee = [
  { role: 'Fest Coordinator', name: 'Dr. Rajesh Kumar' },
  { role: 'Cultural Head', name: 'Prof. Lakshmi Rao' },
  { role: 'Sports Head', name: 'Coach Vikram Singh' },
  { role: 'Event Manager', name: 'Ananya Iyer' },
  { role: 'Registration Lead', name: 'Karthik Nair' },
  { role: 'PR & Media', name: 'Sneha Reddy' },
];

const previousEditions = [
  { year: '2K25', theme: 'Rhythms of Diversity', participants: '450+' },
  { year: '2K24', theme: 'Colors Unleashed', participants: '380+' },
  { year: '2K23', theme: 'Voices in Harmony', participants: '320+' },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[hsl(var(--colorido-pink))] via-[hsl(var(--colorido-orange))] to-[hsl(var(--colorido-yellow))] p-8 text-center text-white sm:p-16">
        <div className="absolute inset-0 bg-mesh opacity-20" />
        <div className="relative">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">About COLORIDO</h1>
          <p className="mt-3 text-lg text-white/80 max-w-2xl mx-auto">{FEST_CONFIG.tagline}</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title} className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Celebrations */}
      <section className="py-12">
        <SectionHeading title="Two Worlds, One Fest" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {celebrations.map((c) => (
            <Card key={c.title} className="overflow-hidden">
              <div className={`flex h-32 items-center justify-center bg-gradient-to-br ${c.gradient}`}>
                <c.icon className="h-12 w-12 text-white" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Participate */}
      <section className="py-12">
        <SectionHeading title="Why Participate?" subtitle="More than just a fest — it's an experience" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <Card key={r.title} className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <r.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">{r.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Previous Editions */}
      <section className="py-12">
        <SectionHeading title="Previous Editions" subtitle="A legacy of celebration" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {previousEditions.map((e) => (
            <Card key={e.year} className="p-6 text-center">
              <p className="font-display text-3xl font-bold text-gradient">{e.year}</p>
              <p className="mt-2 text-sm font-medium">{e.theme}</p>
              <p className="mt-1 text-xs text-muted-foreground">{e.participants} participants</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Organizing Committee */}
      <section className="py-12">
        <SectionHeading title="Organizing Committee" subtitle="The team behind COLORIDO 2K26" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {committee.map((member) => (
            <Card key={member.name} className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white font-bold">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <Button className="bg-gradient-to-r from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white" size="lg">
          Join the Celebration
        </Button>
      </section>
    </div>
  );
}
