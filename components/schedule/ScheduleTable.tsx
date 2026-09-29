'use client';

import { Badge } from '@/components/ui/badge';
import type { ScheduleItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Calendar, Clock, MapPin } from 'lucide-react';

const statusConfig = {
  upcoming: { label: 'Upcoming', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  ongoing: { label: 'Ongoing', className: 'bg-green-100 text-green-700 border-green-200' },
  completed: { label: 'Completed', className: 'bg-gray-100 text-gray-600 border-gray-200' },
};

const categoryColor: Record<string, string> = {
  Cultural: 'bg-pink-100 text-pink-700 border-pink-200',
  Sports: 'bg-green-100 text-green-700 border-green-200',
};

interface ScheduleTableProps {
  items: ScheduleItem[];
}

export function ScheduleTable({ items }: ScheduleTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
        No events scheduled for this filter.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const status = statusConfig[item.status];
        const catColor = categoryColor[item.category] || categoryColor.Cultural;
        return (
          <div
            key={item.id}
            className="group flex flex-col gap-3 rounded-xl border bg-card p-4 transition-all hover:shadow-md sm:flex-row sm:items-center sm:gap-4"
          >
            <div className="flex items-center gap-3 sm:w-32 shrink-0">
              <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--colorido-pink))]/10 to-[hsl(var(--colorido-orange))]/10">
                <span className="text-xs font-medium text-muted-foreground">
                  {new Date(item.date).toLocaleDateString('en-US', { month: 'short' })}
                </span>
                <span className="font-display text-lg font-bold text-gradient">
                  {new Date(item.date).getDate()}
                </span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <Badge className={cn('border', catColor)} variant="outline">
                  {item.category}
                </Badge>
                <Badge className={cn('border', status.className)} variant="outline">
                  {status.label}
                </Badge>
              </div>
              <h3 className="font-semibold text-sm sm:text-base">{item.eventName}</h3>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {item.venue}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
