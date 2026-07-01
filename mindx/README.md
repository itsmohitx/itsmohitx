# MohitX (v2)

The evolution of the site in `the-mind/`. Same architecture and content pipeline,
new surface: an editorial front page instead of a hero stack, Fraunces plus
Fragment Mono, two high-contrast themes, and real provenance (the e/acc Index and
X, linked live). The original stays untouched at the root URL; this deploys to
the `/v2` subpath for preview and moves to a root domain with one env var.

## House rules (enforced)

- No box, card, or rounded-container layouts anywhere. Hairline rules, full-bleed
  bands, and plain columns. `border-radius: 0` is set globally.
- No em dashes in any copy or UI text.
- No low-contrast grey text. Secondary text is tinted ink at 7:1 or better.
- Serif plus mono only (Fraunces, Fragment Mono). No generic sans.
- The header/hero blend is the only gradient on the site.
- The 8 essay bodies are final. Do not edit them.

## Themes

- Dark (default), "Cool Blackout": `#0B0E12` / `#EEF2F6` / electric blue `#5FB0FF`
- Light, "Stark Print": `#FFFFFF` / `#0B0B0B` / red accent

## Hero media (drop-in, no code changes)

- `public/hero.jpg`: the full-bleed hero image. Until it exists, the band renders
  the two-color blend.
- `public/footer.mp4`: the small footer loop, same scene. Hidden until the file
  exists. Muted, honours reduced motion.

## Build and deploy

```bash
npm install
npm run dev                # http://localhost:3000
npm run build              # static export to out/
```

The GitHub Actions workflow builds `the-mind/` to the Pages root (unchanged) and
this folder to `/v2`. To move v2 to its own domain later:

```bash
NEXT_PUBLIC_BASE_PATH= NEXT_PUBLIC_SITE_URL=https://yourdomain.com npm run build
```

Then serve `out/` anywhere (Pages, Vercel, Netlify). Internal links use
`next/link`, so they follow the base path automatically on any domain.

## OG images

`public/og/*.png` are pre-generated (wordmark plus title on the theme blend),
1200x630, one per essay plus a default. Regenerate after adding an essay by
re-running the generator (see the git history for `_og.mjs`) or drop in your own.
