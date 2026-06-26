// Site identity and presentation metadata. Ordering/kind/featured live here so the
// content markdown files can stay byte-for-byte verbatim (no prose or frontmatter edits).

export const site = {
  name: "Mohit Jain",
  tagline: "Optimist about the technology. Skeptic about who ends up holding it.",
  description:
    "I write about where frontier technology is taking us, and who it leaves behind. AI, space, biology, and the patterns that decide whether the future is shared or captured.",
  x: { handle: "@MohitX_", href: "https://x.com/MohitX_" },
};

type EssayMeta = { order: number; kind: "pillar" | "short"; featured?: boolean };

const ESSAY_META: Record<string, EssayMeta> = {
  "an-optimists-note": { order: 1, kind: "short", featured: true },
  "what-accelerates-a-civilization": { order: 2, kind: "pillar" },
  "the-recapture-pattern": { order: 3, kind: "pillar" },
  "the-two-tier-future": { order: 4, kind: "pillar" },
  "the-case-for-leaving-earth": { order: 5, kind: "pillar" },
  "the-longevity-imperative": { order: 6, kind: "pillar" },
  "the-optimists-bet": { order: 7, kind: "pillar" },
  "the-assistant-you-trust": { order: 8, kind: "short" },
};

export function essayMeta(slug: string): EssayMeta {
  return ESSAY_META[slug] ?? { order: 99, kind: "pillar" };
}

/** Prefix an internal path with the configured base so links work at root or subpath. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return base + path;
}

export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** A short teaser drawn from the essay's own opening sentence (their words, unedited). */
export function teaser(body: string, max = 200): string {
  const withoutHeading = body.replace(/^\s*#.*$/m, "").trim();
  const firstPara = (withoutHeading.split(/\n\s*\n/)[0] || "").replace(/\s+/g, " ").trim();
  const match = firstPara.match(/^(.*?[.?!])(\s|$)/);
  let sentence = match ? match[1] : firstPara;
  if (sentence.length > max) sentence = sentence.slice(0, max).trim() + "…";
  return sentence;
}
