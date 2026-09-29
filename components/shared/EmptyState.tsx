import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, message, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        {icon || <Inbox className="h-8 w-8 text-muted-foreground" />}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      {message && <p className="mt-1 text-sm text-muted-foreground max-w-sm">{message}</p>}
    </div>
  );
}

interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message = 'Something went wrong. Please try again.' }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <span className="text-2xl">!</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-destructive">{message}</h3>
    </div>
  );
}
