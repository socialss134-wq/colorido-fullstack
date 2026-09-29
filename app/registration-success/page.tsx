'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FEST_CONFIG } from '@/lib/constants';

export default function RegistrationSuccessPage() {
  const searchParams = useSearchParams();
  const registrationId = searchParams.get('id') || 'CLD-000000';
  const participantName = searchParams.get('name') || 'Participant';
  const eventName = searchParams.get('event') || 'Event';

  const instructions = [
    'Bring a valid college ID card to the event',
    'Report 30 minutes before the scheduled time',
    'Check the Announcements page for updates',
    'Keep your registration ID handy for verification',
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <Card className="overflow-hidden">
        <div className="flex flex-col items-center bg-gradient-to-br from-[hsl(var(--colorido-pink))] via-[hsl(var(--colorido-orange))] to-[hsl(var(--colorido-yellow))] p-8 text-center text-white">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold sm:text-3xl">Registration Successful!</h1>
          <p className="mt-2 text-white/80">Your registration has been confirmed.</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="rounded-xl border bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground">Registration ID</p>
            <p className="font-display text-xl font-bold text-gradient">{registrationId}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border p-4">
              <p className="text-xs text-muted-foreground">Participant Name</p>
              <p className="text-sm font-semibold">{participantName}</p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-xs text-muted-foreground">Event</p>
              <p className="text-sm font-semibold">{eventName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-3">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <p className="text-sm font-medium text-green-700">Status: Confirmed</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold mb-3">Important Instructions</h2>
            <ul className="space-y-2">
              {instructions.map((instruction, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  {instruction}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-primary" />
              March 15-18, 2026
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              Check schedule for timings
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              {FEST_CONFIG.venue}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-gradient-to-r from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white">
              <Link href="/schedule">View Schedule <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
