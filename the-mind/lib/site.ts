/**
 * Site-wide constants: identity, navigation, the one quiet credibility line, and
 * the optional future-project slot (the e/acc Index). House style: no em dashes.
 */

export const site = {
  name: "The Mind",
  author: "Mohit Jain",
  handle: "@MohitX_",
  // Production URL. GitHub Pages project site by default; override with env at build.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://itsmohitx.github.io/itsmohitx",
  description:
    "The public face of a working thinker. Deep essays on frontier technology and where it takes humanity, entered through a living map of how Mohit Jain sees the world.",
  // One quiet credibility line. A whisper, not a flex. No client names, no logos, no grid.
  credibility:
    "Bootstrapped past a million dollars in revenue in under a year, helped run 100-plus frontier-tech events in India, national-level chess.",
  social: [{ label: "X", handle: "@MohitX_", href: "https://x.com/MohitX_" }],
};

/** Persistent top navigation. */
export const nav = [
  { label: "Mind", href: "/", match: (p: string) => p === "/" },
  { label: "Writing", href: "/writing", match: (p: string) => p.startsWith("/writing") },
  { label: "Regions", href: "/regions", match: (p: string) => p.startsWith("/regions") },
  { label: "About", href: "/about", match: (p: string) => p.startsWith("/about") },
  { label: "Now", href: "/now", match: (p: string) => p.startsWith("/now") },
] as const;

/**
 * The e/acc Index. Mohit's in-progress index ranking how much companies actually
 * accelerate civilization. Not public yet, so the site leaves a quiet, disabled
 * footer slot. Flip `live` to true and set `href` when it ships.
 */
export const futureProject = {
  name: "The e/acc Index",
  blurb:
    "A public, transparent index ranking companies by how much they actually accelerate civilization, not by how much they are worth. Launching soon as its own project.",
  live: false,
  href: "",
} as const;
