import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ message = 'Loading...', className }: LoadingStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-20', className)}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="mt-3 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="h-40 w-full rounded-lg bg-muted animate-pulse" />
      <div className="mt-4 h-5 w-3/4 rounded bg-muted animate-pulse" />
      <div className="mt-2 h-4 w-1/2 rounded bg-muted animate-pulse" />
      <div className="mt-4 flex gap-2">
        <div className="h-8 w-20 rounded bg-muted animate-pulse" />
        <div className="h-8 w-20 rounded bg-muted animate-pulse" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
