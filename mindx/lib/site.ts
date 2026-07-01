/**
 * Site identity and navigation. House rules: no em dashes anywhere, no box or
 * card layouts, no low-contrast grey text. The e/acc Index is live work and is
 * linked, never "coming soon".
 */

export const site = {
  name: "MohitX",
  author: "Mohit Jain",
  handle: "@MohitX_",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://itsmohitx.github.io/itsmohitx/v2",
  tagline: "Who the future is for.",
  description:
    "I write about where frontier technology is taking us, and who it leaves behind. AI, space, biology, and the patterns that decide whether the future is shared or captured.",
  x: { label: "X", handle: "@MohitX_", href: "https://x.com/MohitX_" },
  index: {
    name: "The e/acc Index",
    href: "https://eaccindex.com",
    line: "A live scoreboard of who accelerates civilization.",
  },
};

/** Persistent top navigation. "Index" goes straight to the flagship work. */
export const nav = [
  { label: "Writing", href: "/writing", external: false, match: (p: string) => p.startsWith("/writing") || p.startsWith("/seeds") },
  { label: "Index", href: "https://eaccindex.com", external: true, match: () => false },
  { label: "About", href: "/about", external: false, match: (p: string) => p.startsWith("/about") },
] as const;
