import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { FestEvent } from '@/lib/types';
import { cn } from '@/lib/utils';

const statusConfig = {
  open: { label: 'Open', className: 'bg-green-100 text-green-700 border-green-200' },
  closed: { label: 'Closed', className: 'bg-red-100 text-red-700 border-red-200' },
  'filling-fast': { label: 'Filling Fast', className: 'bg-amber-100 text-amber-700 border-amber-200' },
};

const categoryGradient: Record<string, string> = {
  Cultural: 'from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))]',
  Sports: 'from-[hsl(var(--colorido-blue))] to-[hsl(var(--colorido-green))]',
};

interface EventCardProps {
  event: FestEvent;
}

export function EventCard({ event }: EventCardProps) {
  const status = statusConfig[event.status];
  const gradient = categoryGradient[event.category] || categoryGradient.Cultural;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className={cn('relative h-40 bg-gradient-to-br', gradient)}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-5xl font-bold text-white/30">
            {event.subCategory}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <Badge className="glass-dark border-white/20 text-white">
            {event.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className={cn('border', status.className)} variant="outline">
            {status.label}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {event.subCategory}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {event.type}
          </Badge>
        </div>

        <h3 className="font-display text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
          {event.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>{event.venue}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button asChild size="sm" variant="outline" className="flex-1">
            <Link href={`/events/${event.id}`}>
              View Details
            </Link>
          </Button>
          <Button asChild size="sm" className="flex-1 bg-gradient-to-r from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white">
            <Link href={`/registration?eventId=${event.id}`}>
              Register
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
