# GRITHQ

Premium immersive website for GRITHQ — a private holding and investment company.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- Framer Motion page transitions
- React Router

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/     UI components by domain
  data/           Content configuration (portfolio, impact, navigation)
  hooks/          Smooth scroll, media queries, cursor state
  pages/          Home and project detail pages
  styles/         Global CSS and design tokens
public/
  images/         Replace placeholder images here
```

## Content Updates

All content is data-driven. Edit files in `src/data/`:

- `portfolio.ts` — Project details and gallery images
- `impact.ts` — Impact metrics, stories, initiatives
- `developments.ts` — Development projects, philosophy, timeline
- `contact.ts` — Contact information
- `images.ts` — Image path configuration

Replace `[PLACEHOLDER]` values with verified content only.

## Image Assets

Place local images in `public/images/` and update references in `src/data/images.ts` and `src/data/portfolio.ts`.

Current placeholders use Unsplash URLs for architectural photography.
