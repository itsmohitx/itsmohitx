import { defineCollection, z } from "astro:content";

// Essays = the long pillars plus two short pieces. Seeds = short hooks, each
// pointing to a pillar via `links_to` (the title of that pillar).
const essays = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    type: z.string().default("essay"),
  }),
});

const seeds = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    type: z.string().default("seed"),
    links_to: z.string(),
  }),
});

export const collections = { essays, seeds };
