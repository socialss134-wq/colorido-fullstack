import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-8xl font-extrabold text-gradient sm:text-9xl">404</h1>
        <h2 className="mt-4 font-display text-2xl font-bold">Page Not Found</h2>
        <p className="mt-2 text-muted-foreground max-w-md">
          Looks like this page took a detour from the fest. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild className="bg-gradient-to-r from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/cultural">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Explore Events
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
