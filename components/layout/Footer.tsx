import Link from 'next/link';
import { Sparkles, Instagram, Twitter, Facebook, Youtube, Linkedin, MapPin, Mail, Phone } from 'lucide-react';
import { FEST_CONFIG } from '@/lib/constants';

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Cultural Events', href: '/cultural' },
  { label: 'Sports Events', href: '/sports' },
  { label: 'Registration', href: '/registration' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Results', href: '/results' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Contact', href: '/contact' },
];

const socialIcons = [
  { Icon: Instagram, href: FEST_CONFIG.socials.instagram, label: 'Instagram' },
  { Icon: Twitter, href: FEST_CONFIG.socials.twitter, label: 'Twitter' },
  { Icon: Facebook, href: FEST_CONFIG.socials.facebook, label: 'Facebook' },
  { Icon: Youtube, href: FEST_CONFIG.socials.youtube, label: 'YouTube' },
  { Icon: Linkedin, href: FEST_CONFIG.socials.linkedin, label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="relative mt-20 border-t bg-foreground text-background">
      <div className="absolute inset-0 bg-mesh opacity-5" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-bold">
                COLORIDO 2K26
              </span>
            </Link>
            <p className="text-sm text-background/70 max-w-xs">
              {FEST_CONFIG.tagline}. A vibrant celebration of cultural and sports talent.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/90">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/90">Contact</h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{FEST_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{FEST_CONFIG.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{FEST_CONFIG.phone}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/90">Follow Us</h3>
            <div className="flex gap-3">
              {socialIcons.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/10 transition-colors hover:bg-background/20"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-background/10 pt-6 text-center text-sm text-background/60">
          &copy; {new Date().getFullYear()} {FEST_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
