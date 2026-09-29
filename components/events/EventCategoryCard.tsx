import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventCategoryCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
}

export function EventCategoryCard({ title, description, href, icon, gradient }: EventCategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border bg-card p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      <div className={cn('absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br opacity-10 transition-opacity group-hover:opacity-20', gradient)} />
      <div className={cn('flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', gradient)}>
        {icon}
      </div>
      <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
        Explore
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
