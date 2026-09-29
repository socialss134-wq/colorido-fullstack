import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, IndianRupee, UserCircle, Phone, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { FestEvent } from '@/lib/types';
import { cn } from '@/lib/utils';

const statusConfig = {
  open: { label: 'Registration Open', className: 'bg-green-100 text-green-700 border-green-200' },
  closed: { label: 'Registration Closed', className: 'bg-red-100 text-red-700 border-red-200' },
  'filling-fast': { label: 'Filling Fast', className: 'bg-amber-100 text-amber-700 border-amber-200' },
};

interface EventDetailsProps {
  event: FestEvent;
}

export function EventDetails({ event }: EventDetailsProps) {
  const status = statusConfig[event.status];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm">
        <Button asChild variant="ghost" size="sm">
          <Link href={event.category === 'Cultural' ? '/cultural' : '/sports'}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Events
          </Link>
        </Button>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(var(--colorido-pink))] via-[hsl(var(--colorido-orange))] to-[hsl(var(--colorido-yellow))] p-8 sm:p-12">
        <div className="absolute inset-0 bg-mesh opacity-20" />
        <div className="relative">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="glass-dark border-white/20 text-white">{event.category}</Badge>
            <Badge className="glass-dark border-white/20 text-white">{event.subCategory}</Badge>
            <Badge className="glass-dark border-white/20 text-white">{event.type}</Badge>
            {event.gender && (
              <Badge className="glass-dark border-white/20 text-white">{event.gender}</Badge>
            )}
          </div>
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {event.name}
          </h1>
          <p className="mt-3 max-w-2xl text-white/80">{event.description}</p>
          <div className="mt-6">
            <Badge className={cn('border', status.className)} variant="outline">
              {status.label}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="font-display text-xl font-bold mb-4">Event Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoRow icon={Calendar} label="Date" value={new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} />
              <InfoRow icon={Clock} label="Time" value={event.time} />
              <InfoRow icon={MapPin} label="Venue" value={event.venue} />
              <InfoRow icon={Users} label="Team Size" value={`${event.teamSize} ${event.teamSize > 1 ? 'members' : 'member'}`} />
              <InfoRow icon={IndianRupee} label="Registration Fee" value={event.registrationFee === 0 ? 'Free' : `Rs. ${event.registrationFee}`} />
              <InfoRow icon={Calendar} label="Registration Deadline" value={new Date(event.registrationDeadline).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} />
            </div>
            <div className="mt-4 pt-4 border-t">
              <InfoRow icon={UserCircle} label="Eligibility" value={event.eligibility} />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-xl font-bold mb-4">Rules &amp; Regulations</h2>
            <ul className="space-y-3">
              {event.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground/80">{rule}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-xl font-bold mb-4">Important Instructions</h2>
            <ul className="space-y-3">
              {event.importantInstructions.map((instruction, i) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                  <span className="text-sm text-foreground/80">{instruction}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-display text-lg font-bold mb-4">Contact Person</h2>
            <div className="space-y-2">
              <p className="font-medium">{event.contactPerson}</p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                {event.contactNumber}
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-3">
              {event.status === 'closed' ? (
                <p className="text-center text-sm text-muted-foreground py-4">
                  Registration is closed for this event.
                </p>
              ) : (
                <Button asChild className="w-full bg-gradient-to-r from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white">
                  <Link href={`/registration?eventId=${event.id}`}>
                    Register Now
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline" className="w-full">
                <Link href={event.category === 'Cultural' ? '/cultural' : '/sports'}>
                  Back to Events
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
