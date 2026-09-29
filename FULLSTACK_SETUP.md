# COLORIDO 2K26 — Full-Stack Project

This repository contains the existing Next.js frontend plus a production-structured Node.js/Express/TypeScript backend with PostgreSQL and Prisma.

## Architecture

- Frontend: Next.js 13 + React + TypeScript + Tailwind
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL
- ORM: Prisma
- Validation: Zod
- Authentication: JWT + bcrypt
- Security: Helmet + CORS
- Registration data is persisted transactionally in PostgreSQL.

## Project structure

```text
colorido2k26-main/
  app/                 # Existing Next.js pages
  components/          # Existing UI
  lib/
    api/               # Now connected to the real backend
    data/              # Original dummy data retained for reference/seed source
    types.ts
  backend/
    prisma/
      schema.prisma
      seed.ts
    src/
      controllers/
      middleware/
      routes/
      schemas/
      seedData/
      config/
      utils/
```

## 1. Start PostgreSQL

The easiest option is Docker:

```bash
cd backend
docker compose up -d
```

Or create a PostgreSQL database named `colorido2k26` manually.

## 2. Configure backend

```bash
cd backend
copy .env.example .env
```

On macOS/Linux use:

```bash
cp .env.example .env
```

Change `JWT_SECRET` and the admin password before using this outside local development.

## 3. Install and initialize database

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run db:seed
```

The seed imports the existing frontend dummy content into PostgreSQL.

## 4. Start backend

```bash
npm run dev
```

Backend:
`http://localhost:5000`

Health check:
`http://localhost:5000/api/health`

## 5. Connect frontend

At the project root:

```bash
copy .env.local.example .env.local
npm install
npm run dev
```

macOS/Linux:

```bash
cp .env.local.example .env.local
```

The default frontend API URL is:

```text
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Frontend:
`http://localhost:3000`

## Admin API

Default credentials come from `backend/.env`:

```text
Email: admin@colorido.local
Password: ChangeThisPassword123!
```

Login:

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@colorido.local",
  "password": "ChangeThisPassword123!"
}
```

Use the returned JWT as:

```text
Authorization: Bearer <token>
```

Admin endpoints include:

```text
GET    /api/admin/dashboard
GET    /api/admin/registrations
GET    /api/admin/registrations/:id
PUT    /api/admin/registrations/:id/status
GET    /api/admin/registrations/export

GET/POST/PUT/DELETE /api/admin/events
GET/POST/PUT/DELETE /api/admin/announcements
GET/POST/PUT/DELETE /api/admin/results
GET/POST/PUT/DELETE /api/admin/schedule
GET/POST/PUT/DELETE /api/admin/sponsors
GET/POST/PUT/DELETE /api/admin/gallery
```

## Registration flow

The browser submits participant data to:

```text
POST /api/registrations
```

The backend:

1. Looks up the selected event using `eventId`.
2. Does not trust the frontend's event name/type/category.
3. Checks that registration is open.
4. Optionally checks the registration deadline.
5. Validates team members for Group/Team events.
6. Prevents duplicate registration for the same participant/event.
7. Creates participant, registration and team-member rows in one database transaction.
8. Generates the registration ID on the server (`CLD-000001`, etc.).
9. Returns the response shape expected by the existing success page.

`ENFORCE_DEADLINE=false` is intentional for the supplied demo data because the original dummy event dates are in March 2026. Set it to `true` when using real event dates.

## Useful commands

Backend:

```bash
npm run dev
npm run build
npm run start
npm run db:seed
npm run studio
```

Frontend:

```bash
npm run dev
npm run build
npm run start
npm run typecheck
```

## Production notes

- Use a managed PostgreSQL instance.
- Set a strong random JWT secret.
- Set `ENFORCE_DEADLINE=true`.
- Replace demo admin credentials.
- Restrict `FRONTEND_URL` to the real frontend origin.
- Run `npx prisma migrate deploy` during deployment.
- Do not commit `.env` files.
