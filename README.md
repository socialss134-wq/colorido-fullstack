# COLORIDO 2K26 — Full-Stack Version

This project now includes a real backend and PostgreSQL database. See **[FULLSTACK_SETUP.md](./FULLSTACK_SETUP.md)** for complete setup instructions.

- Frontend: Next.js + React + TypeScript + Tailwind
- Backend: Express + TypeScript
- Database: PostgreSQL + Prisma
- Registration: transactional, server-generated registration IDs
- Admin: JWT authentication, registration dashboard, CSV export and CRUD APIs

# COLORIDO 2K26 — College Cultural & Sports Fest

A complete, modern, responsive frontend website for **COLORIDO 2K26**, a college-level cultural and sports fest.

## Tech Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** components
- **react-hook-form** + **zod** for form validation
- **lucide-react** for icons
- **sonner** for toast notifications

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (Navbar, Footer, Toaster)
│   ├── page.tsx                # Home page
│   ├── about/                  # About page
│   ├── cultural/              # Cultural events listing
│   ├── sports/                 # Sports events listing
│   ├── events/[id]/           # Dynamic event details page
│   ├── schedule/              # Schedule/timetable page
│   ├── registration/         # Registration form page
│   ├── registration-success/ # Registration confirmation page
│   ├── announcements/        # Announcements page
│   ├── results/              # Results page
│   ├── gallery/              # Gallery page
│   ├── sponsors/             # Sponsors page
│   ├── contact/              # Contact page
│   └── not-found.tsx         # 404 page
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── shared/               # Hero, SectionHeading, Countdown, LoadingState, EmptyState
│   ├── events/               # EventCard, EventCategoryCard, EventDetails
│   ├── registration/         # RegistrationForm
│   ├── announcements/        # AnnouncementCard
│   ├── results/              # ResultCard
│   ├── sponsors/             # SponsorCard
│   ├── gallery/              # GalleryGrid
│   ├── schedule/             # ScheduleTable
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   ├── constants.ts           # Fest config, nav links, countdown date
│   ├── utils.ts              # cn() utility
│   ├── data/                  # Dummy data files (events, schedule, etc.)
│   └── api/                   # API/service abstraction layer
└── public/                   # Static assets
```

## How to Change Dummy Data

All dummy data is stored in `lib/data/`:

- `events.ts` — Event details (cultural + sports)
- `schedule.ts` — Event schedule/timetable
- `announcements.ts` — Announcements
- `results.ts` — Competition results
- `sponsors.ts` — Sponsor information
- `gallery.ts` — Gallery images

Edit these files directly to update the content shown across the site.

## How to Connect a Backend API

The frontend uses an API/service abstraction layer in `lib/api/`:

- `events.ts` — `getEvents()`, `getEventById(id)`, `getFeaturedEvents()`, `getCulturalEvents()`, `getSportsEvents()`
- `registrations.ts` — `registerParticipant(data)`
- `announcements.ts` — `getAnnouncements()`, `getLatestAnnouncements(limit)`
- `results.ts` — `getResults()`, `getLatestResults(limit)`
- `schedule.ts` — `getSchedule()`
- `sponsors.ts` — `getSponsors()`
- `gallery.ts` — `getGalleryImages()`
- `contact.ts` — `sendContactMessage(data)`

Currently, these functions return dummy data with simulated delays. To connect a real backend:

1. Replace the mock implementations in each `lib/api/*.ts` file with `fetch()` calls to your REST API endpoints.
2. The TypeScript interfaces in `lib/types.ts` define the expected data shapes — match your API responses to these interfaces.
3. The `RegistrationForm` component calls `registerParticipant()` and redirects to `/registration-success` on success — point this to your actual registration endpoint.

### Example: Connecting the events API

```typescript
// lib/api/events.ts
export async function getEvents(): Promise<FestEvent[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}
```

## Configuration

Update fest details in `lib/constants.ts`:

- `FEST_CONFIG` — Name, tagline, dates, venue, contact info, socials
- `NAV_LINKS` — Navigation links
- `COUNTDOWN_DATE` — Target date for the countdown timer

## Pages

| Page | Route |
|------|-------|
| Home | `/` |
| About | `/about` |
| Cultural Events | `/cultural` |
| Sports Events | `/sports` |
| Event Details | `/events/[id]` |
| Schedule | `/schedule` |
| Registration | `/registration` |
| Registration Success | `/registration-success` |
| Announcements | `/announcements` |
| Results | `/results` |
| Gallery | `/gallery` |
| Sponsors | `/sponsors` |
| Contact | `/contact` |
| 404 | `/not-found` |

## Features

- Responsive design (mobile, tablet, desktop, large screens)
- Form validation with react-hook-form + zod
- Loading states and skeleton loaders
- Empty states and error states
- Toast notifications
- Image lightbox in gallery
- Countdown timer
- Filtering on events, schedule, announcements, results, and gallery
- API-ready architecture with service abstraction layer
- Accessible UI with semantic HTML and ARIA labels
