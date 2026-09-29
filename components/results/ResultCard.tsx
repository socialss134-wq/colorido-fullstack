import { Trophy, Medal, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Result } from '@/lib/types';
import { cn } from '@/lib/utils';

const positionConfig = {
  '1st': { Icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', label: '1st Place' },
  '2nd': { Icon: Medal, color: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-200', label: '2nd Place' },
  '3rd': { Icon: Award, color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', label: '3rd Place' },
};

const categoryColor: Record<string, string> = {
  Cultural: 'bg-pink-100 text-pink-700 border-pink-200',
  Sports: 'bg-green-100 text-green-700 border-green-200',
};

interface ResultCardProps {
  result: Result;
}

export function ResultCard({ result }: ResultCardProps) {
  const pos = positionConfig[result.position];
  const catColor = categoryColor[result.category] || categoryColor.Cultural;

  return (
    <Card className={cn('p-5 transition-all duration-300 hover:shadow-md border', pos.bg, pos.border)}>
      <div className="flex items-start gap-4">
        <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm', pos.color)}>
          <pos.Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge className={cn('border', catColor)} variant="outline">
              {result.category}
            </Badge>
            <span className="text-xs text-muted-foreground">{result.subCategory}</span>
          </div>
          <h3 className="font-display text-base font-bold">{result.eventName}</h3>
          <p className="text-sm font-medium text-foreground mt-1">{result.participant}</p>
          <p className="text-xs text-muted-foreground">{result.college}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className={cn('text-xs font-bold', pos.color)}>{pos.label}</span>
            <span className="text-xs text-muted-foreground">— {result.prize}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
