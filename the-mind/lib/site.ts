/**
 * Site-wide constants: identity, navigation, the quiet credibility line, and the
 * optional future-project slot (the e/acc Index). Kept in one place so the whole
 * site reads from a single source of truth.
 */

export const site = {
  name: "The Mind",
  author: "Mohit",
  handle: "@MohitX_",
  url: "https://themind.example", // ← set to the real domain before launch
  description:
    "The public face of a working thinker. Deep essays on frontier technology and where it takes humanity — entered through a living map of how Mohit sees the world.",
  // One quiet credibility line. A whisper, not a flex. No logos, no project grid.
  credibility:
    "Bootstrapped past seven figures in under a year · helped run 100+ frontier-tech events in India · national-level chess.",
  social: [
    { label: "Twitter", handle: "@MohitX_", href: "https://twitter.com/MohitX_" },
    { label: "LinkedIn", handle: "/m0hitx", href: "https://www.linkedin.com/in/m0hitx/" },
  ],
} as const;

/** Persistent top navigation. Order is intentional: the Mind first, the work, then the person. */
export const nav = [
  { label: "Mind", href: "/", match: (p: string) => p === "/" },
  { label: "Writing", href: "/writing", match: (p: string) => p.startsWith("/writing") },
  { label: "Regions", href: "/regions", match: (p: string) => p.startsWith("/regions") },
  { label: "About", href: "/about", match: (p: string) => p.startsWith("/about") },
  { label: "Now", href: "/now", match: (p: string) => p.startsWith("/now") },
] as const;

/**
 * The e/acc Index — Mohit's in-progress index ranking how much companies actually
 * accelerate civilization. Not public yet, so the site only leaves a quiet door open.
 * Flip `live` to true and set `href` when it ships; nothing is built around it.
 */
export const futureProject = {
  name: "The e/acc Index",
  blurb:
    "An index ranking companies by how much they actually accelerate civilization — and surfacing the forces that quietly slowed the progress we could have had.",
  live: false,
  href: "",
} as const;
