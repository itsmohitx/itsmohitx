/**
 * The territory: five regions of one worldview. These drive the regions pages,
 * the map, and the home rows. Connections are first-class content, each
 * annotated with why two regions touch. House style: plain declaratives, no em
 * dashes, no marketing cadence.
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
  /** Kept for data compatibility; the current render uses one accent. */
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
      "What actually accelerates a civilization, and the scoreboard we keep getting wrong. The spine of everything here.",
    blurb:
      "The most lucrative business model of our era is attention extraction, and it reads as progress on every chart while dragging the civilizational ladder. Real acceleration points our best people and our best capital at the frontiers whose payoff has no ceiling, and it keeps human flourishing in the frame as a goal rather than a side effect of revenue. Optimism, in this house, means a direction you point the most ambitious people, checked against a public scoreboard.",
    accent: "amber",
    pos: { x: 50, y: 45 },
    size: 1.25,
  },
  {
    slug: "power-and-recapture",
    title: "Power and Recapture",
    short: "Recapture",
    glance:
      "Liberating technologies keep getting pulled back into concentration. The work is to build against that.",
    blurb:
      "A new technology drops a cost to zero and the field looks flat. Then the incumbents absorb it, and the tool built to spread power becomes the most efficient instrument ever made for concentrating it. The printing press, the internet, crypto, and now AI all run the same play. Recapture is the default rather than destiny, and defaults change when someone decides early enough to be the one who changes them.",
    accent: "oxblood",
    pos: { x: 23, y: 25 },
    size: 1.06,
  },
  {
    slug: "economics-of-ai",
    title: "The Economics of AI",
    short: "Economics of AI",
    glance: "The real risk of AI is the business model we point it at.",
    blurb:
      "The danger lives in what we pay the machine to want. A feed sold your attention. An assistant sells your trust, and trust is the more dangerous thing to sell. Behavior capture, the two-tier future, and the assistant you stop putting down all run on the same incentive, and an incentive is a choice someone made. Verification is the protector half of the answer, and right now almost nobody is building it.",
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
      "When AI runs the software and robots run the factories, a vast amount of human effort comes free, and the only question that matters is where it goes. Space is the frontier that reorganizes everything else, the keystone that holds up every other ambition. A species that knows it is going to the stars stops fighting so hard over a single hill. You protect the only home you have by ceasing to be a single point of failure.",
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
      "The length of a life is handed to us rather than held by us, and a death sentence with an unknown date makes a whole species play short-term games. Control the clock and the planning horizon changes, which changes what humanity is willing to build. Longer lives are also the precondition for the long journey off the planet. The science is becoming real, and the fight is to make it cheap and common before the gap can calcify.",
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
    why: "The attention machine looks like a winner and drags the ladder. Verification is the protector half of the bet.",
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
    why: "Whoever controls the clock first is the two-tier divide taken to its limit, a split in years rather than money.",
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
