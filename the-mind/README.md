# 🧠 The Mind

The public face of a working thinker - deep essays on frontier technology and where
it takes humanity, entered through a **living map of how Mohit sees the world**,
read at whatever depth you choose, and wandered along the trails between ideas.

Not a blog, not a portfolio. **Built in the open.**

> The build follows the v2 / FINAL direction: progressive disclosure + trail reading
> + a lightly-living regions map are the signature. (The earlier
> [`BRIEF.md`](./BRIEF.md) / [`KICKOFF.md`](./KICKOFF.md) describe the superseded
> literal-zoom direction and are kept only for history.)

## What's here (Phase 1 - the spine)

- **The reading experience** - clean, one-column, editorial (Stripe-Press register):
  generous serif, comfortable measure, Tufte-style sidenotes. Mobile-flawless.
- **Multi-resolution reading** - every essay reads at a **Glance**, as a **Map**, or
  in **Deep** (progressive disclosure, not literal zoom).
- **Trail reading** - clicking a linked idea opens it in a pane *beside* the current
  one; earlier panes collapse to labelled spines. The stack is encoded in the URL,
  so Back / refresh / share all work. Degrades to normal navigation on mobile.
- **The regions map** - a crafted, lightly-living homepage object (restrained motion,
  no particle field). Degrades to a clean list on mobile / reduced-motion.
- **Closing provocation** - every essay ends with one sharp question that hands you
  the next essay.
- **Navigation first** - persistent top nav, real routes everywhere, clickable
  breadcrumbs, persistent ← Back / ⌂ Home, plain index views. The whole site is
  usable ignoring every flourish.

Deferred by design (architecture stays ready for them): the AI "ask" layer, a
time/evolution scrub, and the e/acc Index as structure (it has a quiet footer slot).

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind (Warm Ink tokens) · next-themes
(light/dark) · Framer Motion (lazy-loaded for the map) · Lenis · MDX-flavoured
Markdown compiled with a remark/rehype pipeline. Self-hosted fonts via `next/font`
(Newsreader · Space Grotesk · Geist Mono). Vercel-ready.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Add an essay

Drop a `.mdx` file in [`content/essays/`](./content/essays). Everything - the index,
region grouping, next-essay links, the map counts - updates automatically.

```mdx
---
title: "Your Essay Title"
dek: "The standfirst - one or two sentences. Quote the whole value if it has a colon."
region: power-and-recapture      # one of the five region slugs (see content/regions.ts)
glance: "The one-line version, for the Glance depth and indexes."
summary: "A short structural intro shown at the Map depth."
date: 2026-05-01
order: 7                          # controls the reading sequence
featured: true                   # show on the homepage
provocation: "A sharp closing question - a provocation, not a quiz."
---

Your opening paragraph becomes the lede automatically.

## A section heading
Headings (## / ###) build the Map outline.

A sentence with a margin note.:sidenote[This becomes a Tufte-style sidenote.]
Follow an idea to :trail[another essay]{slug=the-two-tier-future} or a
:region[region]{slug=economics-of-ai}.
```

**Frontmatter tip:** wrap free-text fields in double quotes (YAML breaks on an
unquoted `:`), and prefer single quotes for any inner quotation.

## Edit the worldview

The five regions, their map positions, and the annotated connections between them
live in [`content/regions.ts`](./content/regions.ts). Identity, the quiet
credibility line, and the e/acc Index footer slot live in [`lib/site.ts`](./lib/site.ts).

## Structure

```
app/            routes - / · /writing · /writing/[slug] · /regions · /regions/[slug] · /about · /now · 404
  writing/[slug]/fragment/   route handler feeding the trail panes
components/      site (nav/footer/theme) · reading (tabs/essay/provocation) · trail (panes) · map
content/         regions.ts + essays/*.mdx
lib/             essays.ts (corpus) · mdx.ts (compiler) · site.ts · fonts.ts
```

---

*By Mohit ([@MohitX_](https://twitter.com/MohitX_)).*
