# manyminds.de

Personal consulting website for AI agents and automation services.

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JS with scroll-snap sections
- **Backend**: Vercel Serverless Functions (TypeScript)
- **Email**: Resend API

## Features

- Full-page scroll-snap navigation
- Custom booking calendar with scarcity messaging
- Slot validation (frontend + backend)
- LocalStorage for user's booked slots
- Responsive design

## Development

```bash
npm install
npx vercel dev
```

Requires `RESEND_API_KEY` in Vercel environment.

## API Endpoints

- `GET /api/slots` - Returns available booking slots (filtered to month+2)
- `POST /api/book` - Submit booking request, sends email via Resend

## Deployment

Deployed via Vercel. Push to main triggers automatic deployment.
