
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NAV_LINKS, FEST_CONFIG } from '@/lib/constants';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'glass shadow-md' : 'bg-transparent'
      )}
    >
      <nav className="flex w-full h-16 items-center justify-between px-4 sm:px-6 lg:px-8 bg-white">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="COLORIDO 2K26 Home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>

          <span className="font-display text-lg font-bold tracking-tight">
            COLORIDO<span className="text-gradient"> 2K26</span>
          </span>
        </Link>

        {/* Desktop Navigation - visible only on XL screens */}
        <div className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-primary'
                  : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Register button - desktop only */}
        <div className="hidden xl:block">
          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white hover:opacity-90"
          >
            <Link href="/registration">Register Now</Link>
          </Button>
        </div>

        {/* Hamburger - mobile + tablet + medium screens */}
        <button
          className="xl:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile + Tablet Menu */}
      {open && (
        <div className="xl:hidden">
          <div className="glass border-t px-4 pb-4 pt-2 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}

            <Button
              asChild
              className="mt-2 w-full bg-gradient-to-r from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white"
            >
              <Link href="/registration">Register Now</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}