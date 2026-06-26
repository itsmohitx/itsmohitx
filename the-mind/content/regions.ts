/**
 * The real territory — Mohit's worldview, not generic AI-builder labels.
 *
 * These six regions are the homepage map and live at /regions/[slug]. The
 * `connections` are first-class content: the non-obvious links between regions,
 * each annotated with *why* two ideas relate. Map positions are hand-placed for a
 * pleasing constellation (percentages of the map field).
 */

export type RegionSlug =
  | "recapture-pattern"
  | "behavior-capture"
  | "two-tier-future"
  | "leaving-earth"
  | "longevity"
  | "verification";

export interface Region {
  slug: RegionSlug;
  title: string;
  /** Short label for the map node and breadcrumbs. */
  short: string;
  /** One line — the glance. */
  glance: string;
  /** A paragraph for the region page. */
  blurb: string;
  /** Accent semantics: oxblood = a force to watch; amber = a protector / expansion play. */
  accent: "amber" | "oxblood";
  /** Position on the map field, as percentages (0–100). */
  pos: { x: number; y: number };
  /** Relative node weight on the map. */
  size: number;
}

export interface Connection {
  a: RegionSlug;
  b: RegionSlug;
  /** Why these two ideas relate — the connection is the content. */
  why: string;
}

export const regions: Region[] = [
  {
    slug: "recapture-pattern",
    title: "The recapture pattern",
    short: "Recapture",
    glance: "Every liberating technology eventually gets recaptured into concentration.",
    blurb:
      "The printing press, radio, the open web — each arrived as a great decentralizer and each was pulled back into a few hands. The pattern isn't a conspiracy; it's the default gravity of capital, distribution, and attention. Naming the pattern is the first move toward resisting it: if recapture is the rule, then the interesting work is designing the exceptions.",
    accent: "oxblood",
    pos: { x: 27, y: 37 },
    size: 1.18,
  },
  {
    slug: "behavior-capture",
    title: "The economics of AI & behavior capture",
    short: "Behavior capture",
    glance: "The real risk of AI isn't the machine — it's the business model around it.",
    blurb:
      "The attention economy is co-produced: top-down by platforms optimizing for engagement, and bottom-up by an entire clipping industry of money-chasers. Point a far more capable AI at that same objective function and you don't get a smarter helper — you get a far better behavior-capture engine. The danger was never the model's intelligence; it was what we paid it to want.",
    accent: "oxblood",
    pos: { x: 55, y: 22 },
    size: 1.06,
  },
  {
    slug: "two-tier-future",
    title: "The two-tier future",
    short: "Two tiers",
    glance: "AI doesn't create the gap — it widens one that already exists.",
    blurb:
      "Argued backward from a concrete near-future scene rather than forward from a trend line. One tier compounds: it uses AI to think better, build faster, and buy back time. The other is used by it — managed, nudged, and rented to. The fork isn't decided by the technology; it's decided by who learns to wield it and who is wielded. The essay's job is to make that fork vivid before it sets.",
    accent: "oxblood",
    pos: { x: 77, y: 39 },
    size: 1.02,
  },
  {
    slug: "leaving-earth",
    title: "Leaving Earth",
    short: "Leaving Earth",
    glance: "Why a real share of humanity should aim to become multiplanetary.",
    blurb:
      "Not as an escape hatch and not as a billionaire's hobby — as insurance and as direction. A species with all its eggs on one rock is one bad century from the end of the story. But the deeper argument is about ambition: a civilization needs a frontier to organize its optimism around. Leaving Earth is the clearest one we have.",
    accent: "amber",
    pos: { x: 20, y: 71 },
    size: 0.96,
  },
  {
    slug: "longevity",
    title: "Longevity",
    short: "Longevity",
    glance: "Biology is becoming a programming language.",
    blurb:
      "Aging is being reframed from an inevitability into a set of mechanisms — and mechanisms can be edited. As biology turns legible and then programmable, the question shifts from 'how long can we live?' to 'what do we build with the extra time, and who gets it first?' The science is optimistic; the distribution is where the fight will be.",
    accent: "amber",
    pos: { x: 79, y: 69 },
    size: 0.96,
  },
  {
    slug: "verification",
    title: "Specific optimism & verification",
    short: "Verification",
    glance: "Verification is the protector play — specific optimism, made concrete.",
    blurb:
      "Optimism that means something isn't a mood; it's a bet on a specific mechanism. In a world where generation is free and behavior capture is industrialized, the scarce, valuable thing becomes verification: proof of what's real, who did what, and what actually happened. Verification is the counter-move to recapture and to capture both — the protector layer a good future quietly runs on.",
    accent: "amber",
    pos: { x: 46, y: 65 },
    size: 1.04,
  },
];

export const connections: Connection[] = [
  {
    a: "recapture-pattern",
    b: "behavior-capture",
    why: "The attention economy is the recapture pattern running on AI: a liberating technology pulled back into concentration through its business model.",
  },
  {
    a: "recapture-pattern",
    b: "two-tier-future",
    why: "Concentration is how the gap hardens — recapture is the mechanism underneath the two tiers.",
  },
  {
    a: "recapture-pattern",
    b: "verification",
    why: "Verification is the counter-move: the protector play designed against recapture.",
  },
  {
    a: "behavior-capture",
    b: "two-tier-future",
    why: "Behavior capture is one engine quietly widening the gap.",
  },
  {
    a: "behavior-capture",
    b: "verification",
    why: "Verification answers capture: proving what's real against what was engineered to move you.",
  },
  {
    a: "two-tier-future",
    b: "verification",
    why: "Verification is what could keep the gap from hardening into caste.",
  },
  {
    a: "leaving-earth",
    b: "longevity",
    why: "The same bet on a bigger future — more room, and more time to use it.",
  },
  {
    a: "verification",
    b: "leaving-earth",
    why: "Specific optimism: not 'it'll be fine,' but the concrete bet that makes the leap worth taking.",
  },
  {
    a: "longevity",
    b: "two-tier-future",
    why: "If biology becomes programmable, who gets the upgrade decides how deep the two tiers run.",
  },
];

export function getRegion(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}

export function connectionsFor(slug: string): { region: Region; why: string }[] {
  return connections
    .filter((c) => c.a === slug || c.b === slug)
    .map((c) => {
      const otherSlug = c.a === slug ? c.b : c.a;
      return { region: getRegion(otherSlug)!, why: c.why };
    });
}
