# Mohit Jain - essays

A clean, fast, text-first essay site. Not a blog, not a portfolio. The ideas are the
product, in the register of paulgraham.com or stephango.com with a warm, literary feel.

Built with [Astro](https://astro.build) (markdown-native, ships almost no JavaScript).
Warm Ink palette, dark by default with a light toggle. The writing is the design.

## Structure

- **Home** (`/`) - hero, "An Optimist's Note" featured first, the essays as the
  centerpiece, the seeds as quick doorways.
- **Essays** (`/essays/[slug]`) - the long pillars plus two short pieces. Each pillar
  lists the seeds that open into it.
- **Seeds** (`/seeds/[slug]`) - short hooks. Each ends with a clear link to its pillar
  (the `links_to` field in its frontmatter).
- **About** (`/about`).
- Real URLs everywhere, so browser back, refresh, and link sharing all work.

## Content

All writing lives in `src/content/` as Markdown:

- `src/content/essays/*.md` - frontmatter: `title`, `type`.
- `src/content/seeds/*.md` - frontmatter: `title`, `type`, `links_to` (the exact title
  of the pillar it points to).

Order, "featured", and pillar-vs-note are set in `src/lib/site.ts` (`ESSAY_META`) so the
markdown files stay clean. The prose is rendered exactly as written. House style: no em
dashes.

To add an essay: drop a `.md` file in `src/content/essays/`, give it a `title`, then add
a line to `ESSAY_META` with its `order`. To add a seed: drop a `.md` in
`src/content/seeds/` with `links_to` set to a pillar's title.

## Develop

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve the production build
```

## Deploy

The build is static and base-aware (works at a domain root or a subpath). Pick one:

**Vercel (recommended, one login):**
```bash
npm i -g vercel
vercel --prod          # from this folder; authenticate once when prompted
```

**Netlify:**
```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

**GitHub Pages (project subpath):** build with the base set, then publish `dist/`:
```bash
PUBLIC_SITE_URL=https://itsmohitx.github.io PUBLIC_BASE_PATH=/itsmohitx/ npm run build
```

Set `PUBLIC_SITE_URL` to the real domain before launch (used for canonical/OG URLs).
