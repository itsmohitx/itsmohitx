# Mohit Jain — Portfolio

A brutalist-modern personal portfolio. Bold type, hard grids, one loud accent.

## Stack

| Layer         | Tech                                  |
| ------------- | ------------------------------------- |
| Framework     | Next.js 16 (App Router) + TypeScript  |
| Styling       | Tailwind CSS v4                       |
| Animation     | Motion (Framer Motion) + GSAP         |
| Smooth scroll | Lenis                                 |
| 3D (ready)    | three.js + @react-three/fiber + drei  |

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
src/
  app/
    layout.tsx     # fonts, metadata, smooth-scroll wrapper
    page.tsx       # the landing page (hero, work, projects, contact)
    globals.css    # brutalist theme tokens + Lenis styles
  components/
    SmoothScroll.tsx
    Marquee.tsx
```

## Design tokens

Defined in `src/app/globals.css` and exposed to Tailwind as utilities:

- `bg-paper` / `text-paper` — warm off-white `#e9e7e0`
- `bg-ink` / `text-ink` — near-black `#0d0d0d`
- `bg-accent` / `text-accent` — electric indigo `#4f2bff`
- `bg-accent-2` / `text-accent-2` — acid lime `#c6f032`
- `font-display` — Space Grotesk (headings)
- `font-mono` — Geist Mono (body / labels)

## Collaboration workflow (Codex + Claude)

This project is built collaboratively:

- **Codex** owns the visual design — new sections, layouts, components, refined
  styling. Work on a branch and commit your changes.
- **Claude** owns integration, engineering, fixes, responsiveness and deploys —
  pulls design work in, wires up animations and keeps everything consistent.

To avoid conflicts: keep new design pieces as **separate components** under
`src/components/` and compose them in `page.tsx`, rather than rewriting shared
files wholesale.

## Deploy

Optimised for Vercel — import the repo, set the project root to `portfolio/`,
and deploy. No extra config needed.
