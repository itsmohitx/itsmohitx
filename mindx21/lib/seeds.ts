/**
 * Seeds: short entry notes. Each one ends by pointing to a pillar essay (its
 * `links_to` slug). Seeds are the funnel and the trail into the deep essays: on a
 * seed page, the "read the pillar" link opens the pillar beside it (desktop trail
 * panes) or navigates to it (mobile / no JS).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileEssay } from "./mdx";
import type { RegionSlug } from "@/content/regions";

const SEEDS_DIR = path.join(process.cwd(), "content", "seeds");

export interface SeedMeta {
  slug: string;
  title: string;
  region: RegionSlug;
  /** Slug of the pillar essay this seed opens into. */
  links_to: string;
  order: number;
  readingTime: number;
}

export interface Seed extends SeedMeta {
  html: string;
}

function readRaw(slug: string): { data: Record<string, any>; content: string } | null {
  const file = path.join(SEEDS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}

function toMeta(slug: string, data: Record<string, any>, content: string): SeedMeta {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: data.title ?? slug,
    region: data.region as RegionSlug,
    links_to: data.links_to ?? "",
    order: typeof data.order === "number" ? data.order : 999,
    readingTime: Math.max(1, Math.round(words / 200)),
  };
}

export function getSeedSlugs(): string[] {
  if (!fs.existsSync(SEEDS_DIR)) return [];
  return fs
    .readdirSync(SEEDS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllSeeds(): SeedMeta[] {
  return getSeedSlugs()
    .map((slug) => {
      const raw = readRaw(slug);
      return raw ? toMeta(slug, raw.data, raw.content) : null;
    })
    .filter((m): m is SeedMeta => m !== null)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getSeedsByRegion(region: RegionSlug): SeedMeta[] {
  return getAllSeeds().filter((s) => s.region === region);
}

/** Seeds that open into a given pillar essay (by essay slug). */
export function getSeedsForPillar(pillarSlug: string): SeedMeta[] {
  return getAllSeeds().filter((s) => s.links_to === pillarSlug);
}

export async function getSeed(slug: string): Promise<Seed | null> {
  const raw = readRaw(slug);
  if (!raw) return null;
  const meta = toMeta(slug, raw.data, raw.content);
  const { html } = await compileEssay(raw.content);
  return { ...meta, html };
}
