export const FEST_CONFIG = {
  name: 'COLORIDO 2K26',
  tagline: 'Where Talent Meets the Spotlight',
  startDate: '2026-10-09',
  endDate: '2026-10-12',
  venue: 'Main Campus Auditorium & Grounds',
  college: 'Colorido College of Arts & Science',
  registrationDeadline: '2026-10-06',
  email: 'colorido2k26@college.edu',
  phone: '+91 98765 43210',
  address: 'Colorido College Campus, University Road, Bengaluru, Karnataka 560001',
  socials: {
    instagram: '#',
    twitter: '#',
    facebook: '#',
    youtube: '#',
    linkedin: '#',
  },
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Cultural', href: '/cultural' },
  { label: 'Sports', href: '/sports' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Announcements', href: '/announcements' },
  { label: 'Results', href: '/results' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Contact', href: '/contact' },
] as const;

export const COUNTDOWN_DATE = FEST_CONFIG.startDate;
