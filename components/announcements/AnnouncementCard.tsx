import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { AlertCircle, Calendar } from 'lucide-react';
import type { Announcement } from '@/lib/types';
import { cn } from '@/lib/utils';

const categoryColors: Record<string, string> = {
  General: 'bg-blue-100 text-blue-700 border-blue-200',
  Cultural: 'bg-pink-100 text-pink-700 border-pink-200',
  Sports: 'bg-green-100 text-green-700 border-green-200',
  Registration: 'bg-amber-100 text-amber-700 border-amber-200',
  Important: 'bg-red-100 text-red-700 border-red-200',
};

const priorityConfig = {
  high: { dot: 'bg-red-500', label: 'High Priority' },
  medium: { dot: 'bg-amber-500', label: 'Medium Priority' },
  low: { dot: 'bg-blue-500', label: 'Low Priority' },
};

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const catColor = categoryColors[announcement.category] || categoryColors.General;
  const priority = priorityConfig[announcement.priority];

  return (
    <Card className="p-5 transition-all duration-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge className={cn('border', catColor)} variant="outline">
              {announcement.category}
            </Badge>
            <div className="flex items-center gap-1.5">
              <span className={cn('h-2 w-2 rounded-full', priority.dot)} />
              <span className="text-xs text-muted-foreground">{priority.label}</span>
            </div>
          </div>
          <h3 className="font-display text-base font-bold tracking-tight">
            {announcement.title}
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground line-clamp-3">
            {announcement.description}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(announcement.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
        </div>
      </div>
      {announcement.priority === 'high' && (
        <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-700">
          <AlertCircle className="h-3.5 w-3.5" />
          Important announcement — please read carefully
        </div>
      )}
    </Card>
  );
}
