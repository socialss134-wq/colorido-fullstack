# COLORIDO 2K26 API

Base URL: `http://localhost:5000/api`

## Public

- `GET /health`
- `GET /events`
- `GET /events/:id`
- `GET /events/featured`
- `GET /events/cultural`
- `GET /events/sports`
- `GET /announcements`
- `GET /announcements/latest?limit=3`
- `GET /results`
- `GET /results/latest?limit=5`
- `GET /schedule`
- `GET /sponsors`
- `GET /gallery`
- `POST /contact`
- `POST /registrations`

## Authentication

- `POST /auth/login`
- `GET /auth/me`

## Admin

All admin routes require `Authorization: Bearer <JWT>`.

CRUD resources:

`events`, `announcements`, `results`, `schedule`, `sponsors`, `gallery`

Registration management:

- `GET /admin/registrations`
- `GET /admin/registrations/:id`
- `PUT /admin/registrations/:id/status`
- `GET /admin/registrations/export`
- `GET /admin/dashboard`

All successful responses use:

```json
{ "success": true, "data": {} }
```

Errors use:

```json
{ "success": false, "message": "Reason", "code": "ERROR_CODE" }
```
