## DGQ marketing site

This is a **Vite + React + TypeScript + Tailwind** website.

### Run locally

```bash
npm install
npm run dev
```

Vite will print the local URL (usually `http://localhost:5173/`). If that port is busy it will pick the next one.

### Build & preview

```bash
npm run build
npm run preview
```

### Deploy (Vercel) + domain

This repo is set up to deploy as:

- **Frontend**: static Vite build (`dist/`)
- **API**: serverless function at `api/request-appointment.ts` (available at `/api/request-appointment`)

#### 1) Create the Vercel project

- Import the repo in Vercel (New Project).
- Build settings:
  - **Build command**: `npm run build`
  - **Output directory**: `dist`

#### 2) Set environment variables (Preview + Production)

Add these in Vercel → Project Settings → Environment Variables:

- `RESEND_API_KEY` (required)
- `BOOKING_TO_EMAIL` (optional; defaults to `ducksgquack@gmail.com`)
- `BOOKING_FROM_EMAIL` (optional; defaults to `DGQ Booking <booking@resend.dev>`)

#### 3) Add the domain

When you buy `dgqmedia.co.uk`, add both to Vercel:

- `dgqmedia.co.uk`
- `www.dgqmedia.co.uk`

Then set DNS at your registrar following Vercel’s instructions (Vercel will show the exact records to add).

#### 4) SEO files

These are served automatically from `public/`:

- `public/robots.txt`
- `public/sitemap.xml`
- `public/og-image.png`

### Notes

- If you run `vite --host` here and hit a `uv_interface_addresses` error, run `npm run dev` without `--host` (localhost-only).
