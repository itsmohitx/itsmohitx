/**
 * The real territory. Five regions of Mohit's worldview, not generic AI-builder
 * labels. These are the homepage map and live at /regions/[slug]. The connections
 * are first-class content: the genuine links between regions, each annotated with
 * why two ideas relate. Map positions are hand-placed (percentages of the field).
 *
 * House style across the whole site: no em dashes.
 */

export type RegionSlug =
  | "power-and-recapture"
  | "economics-of-ai"
  | "leaving-earth"
  | "longevity-and-biology"
  | "acceleration-and-optimism";

export interface Region {
  slug: RegionSlug;
  title: string;
  short: string;
  glance: string;
  blurb: string;
  /** Accent semantics: oxblood = a force to watch; amber = a frontier or protector play. */
  accent: "amber" | "oxblood";
  pos: { x: number; y: number };
  size: number;
}

export interface Connection {
  a: RegionSlug;
  b: RegionSlug;
  why: string;
}

export const regions: Region[] = [
  {
    slug: "acceleration-and-optimism",
    title: "Acceleration and Optimism",
    short: "Acceleration",
    glance:
      "What actually accelerates a civilization, and the optimism that does the work. The spine of everything here.",
    blurb:
      "Not everything that wins moves us forward. The most lucrative business model of our era is attention extraction, and it is a drag dressed as progress. Real acceleration points our best people and our best capital at the frontiers whose payoff has no ceiling, and keeps human flourishing in the frame rather than treating it as a side effect of revenue. Optimism here is not a mood. It is a direction you point the most ambitious people, and a scoreboard pointed the right way.",
    accent: "amber",
    pos: { x: 50, y: 45 },
    size: 1.25,
  },
  {
    slug: "power-and-recapture",
    title: "Power and Recapture",
    short: "Recapture",
    glance:
      "Every liberating technology is sold as freedom and ends as control. The work is to build against that.",
    blurb:
      "A new technology drops a cost to zero and the field looks flat, then the incumbents absorb it and the tool built to spread power becomes the most efficient instrument ever made for concentrating it. The printing press, the internet, crypto, and now AI all run the same play. Recapture is not destiny, it is the default, and defaults are the easiest thing in the world to change if you decide early enough to be the one who changes them.",
    accent: "oxblood",
    pos: { x: 23, y: 25 },
    size: 1.06,
  },
  {
    slug: "economics-of-ai",
    title: "The Economics of AI",
    short: "Economics of AI",
    glance:
      "The real risk of AI is not the machine. It is the business model we point it at.",
    blurb:
      "The danger was never the intelligence. It is what we pay the machine to want. A feed sold your attention and an assistant sells your trust, which is the more dangerous thing to sell. Behavior capture, the two-tier future, and the assistant you stop putting down all run on the same incentive, and a business model is a choice, not a law of nature. Verification is the protector half of the answer, and almost nobody is building it.",
    accent: "oxblood",
    pos: { x: 77, y: 33 },
    size: 1.1,
  },
  {
    slug: "leaving-earth",
    title: "Leaving Earth",
    short: "Leaving Earth",
    glance: "Why becoming multiplanetary is one of the central projects of this century.",
    blurb:
      "When AI runs the software and robots run the factories, a vast amount of human effort comes free, and the only question that matters is where it goes. Space is the frontier that reorganizes everything else, the keystone that holds up every other ambition. A species that knows it is going to the stars stops fighting so hard over a single hill. The way you protect the only home you have is to stop being a single point of failure.",
    accent: "amber",
    pos: { x: 27, y: 74 },
    size: 0.98,
  },
  {
    slug: "longevity-and-biology",
    title: "Longevity and Biology",
    short: "Longevity",
    glance:
      "Biology is becoming a language we can read and write, and lifespan a choice rather than a dice roll.",
    blurb:
      "The problem was never that life is short. It is that its length is handed to us rather than held by us, and a death sentence with an unknown date makes a whole species play short-term games. Control the clock and the planning horizon changes, which changes what humanity is willing to build. Longer lives are also the precondition for the long journey off the planet. The science is becoming real, and the fight is to make it cheap and common before the gap can calcify.",
    accent: "amber",
    pos: { x: 75, y: 73 },
    size: 0.98,
  },
];

export const connections: Connection[] = [
  {
    a: "power-and-recapture",
    b: "economics-of-ai",
    why: "Behavior capture and the two-tier future are the recapture pattern running on AI, the same liberation pulled back into concentration.",
  },
  {
    a: "power-and-recapture",
    b: "acceleration-and-optimism",
    why: "Recapture is the default that acceleration has to resist. The scoreboard exists to name who resists it and who runs it.",
  },
  {
    a: "economics-of-ai",
    b: "acceleration-and-optimism",
    why: "The attention machine looks like a winner and is actually a drag. Verification is the protector half of the bet.",
  },
  {
    a: "leaving-earth",
    b: "longevity-and-biology",
    why: "The same bet on a bigger future. Longer lives are the precondition for the long journey off the planet.",
  },
  {
    a: "acceleration-and-optimism",
    b: "leaving-earth",
    why: "When AI frees a species worth of effort, space is the frontier with no ceiling to point it at.",
  },
  {
    a: "acceleration-and-optimism",
    b: "longevity-and-biology",
    why: "Programmable biology is the clearest accelerant of all, a germ-theory moment if we choose to fund it.",
  },
  {
    a: "economics-of-ai",
    b: "longevity-and-biology",
    why: "Whoever controls the clock first is the two-tier divide taken to its limit, a split not in money but in years.",
  },
  {
    a: "power-and-recapture",
    b: "longevity-and-biology",
    why: "Longevity is the next technology lined up to be recaptured, sold as liberation and gated by wealth.",
  },
  {
    a: "power-and-recapture",
    b: "leaving-earth",
    why: "Leaving Earth can concentrate too, a frontier captured by a few hands rather than opened to many.",
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
