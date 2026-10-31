# ENGENOVA landing page

Bilingual (English / Arabic) marketing site for ENGENOVA, built with Next.js 16 (App Router, Cache Components), Tailwind CSS v4 and GSAP.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `/` redirects to `/en`; the Arabic page is `/ar`.

## Environment variables

| Name | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | In production | [Resend](https://resend.com) API key used by the enquiry form. |
| `ENQUIRY_TO` | In production | Where enquiries are delivered. Comma-separate several addresses. |
| `ENQUIRY_FROM` | Recommended | Sender, e.g. `ENGENOVA Website <web@engenova.com>`. Must use a domain verified in Resend. Defaults to Resend's test sender `onboarding@resend.dev`. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public origin, e.g. `https://engenova.com`. Used as `metadataBase` for canonical, hreflang and Open Graph URLs. |

When `RESEND_API_KEY` or `ENQUIRY_TO` is missing in development, enquiries are printed to the server log instead of sent. In production the form shows an error instead.

## Dependencies added

- `gsap` and `@gsap/react`: animations, using `ScrollTrigger` and `DrawSVGPlugin` (both ship in the free `gsap` package).
- `zod`: validates enquiries in the Server Action.
- `resend`: sends the enquiry email.
- `libphonenumber-js`: validates the mobile number and works out the country from it. It runs only on the server; the country-code list is built there and passed to the form.

## Where things live

- `app/[locale]/layout.tsx`: root layout. Sets `<html lang dir>` and the fonts (Archivo, IBM Plex Mono, IBM Plex Sans Arabic, plus Montserrat for the wordmark).
- `app/[locale]/page.tsx`: page composition and per-locale `generateMetadata`.
- `app/actions/enquiry.ts`: contact form Server Action. It always emails in English, whichever page the enquiry came from.
- `components/landing/`: one component per section. Server components by default; only the animated or interactive parts are `"use client"`.
- `components/landing/svg/data.ts`: path data for the map, service icons and commitment icons.
- `lib/gsap.ts`: registers the GSAP plugins once and holds the shared `matchMedia` conditions.
- `messages/en.ts` and `messages/ar.ts`: all copy. `ar.ts` is typed against `en.ts`, so a missing key fails `tsc`.
- `app/globals.css`: brand tokens (`@theme`), the `narrow:` variant (≤760px) and shared utilities.

## Notes

- Animations respect `prefers-reduced-motion`. With reduced motion the pinned sections become normal-height blocks, all steps are shown, and the services row becomes a native horizontal scroller.
- Text inside drawings, the logo, standard names (UL 555, AMCA, AHRI, Intertek) and the legal name stay in English on both pages. Mark such elements with `data-latin` so the Arabic font override skips them.
- To add a locale:
  1. Create `messages/<code>.ts` typed as `Messages`.
  2. Register it in `messages/index.ts`. Update `dirOf` if it is RTL.
  3. Add a link in `components/landing/Header.tsx`.
