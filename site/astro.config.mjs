import { defineConfig } from "astro/config";

// Base-aware so the same build deploys to a domain root (Vercel/Netlify) or a
// subpath (GitHub Pages project site). Override with env at build time:
//   PUBLIC_SITE_URL=https://mohitjain.xyz PUBLIC_BASE_PATH=/ npm run build
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || "https://mohit-jain.example",
  base: process.env.PUBLIC_BASE_PATH || "/",
  trailingSlash: "ignore",
  build: { format: "directory" },
});
