/**
 * The essay corpus. Essays live as .mdx files in content/essays with YAML
 * frontmatter. This module reads them (server-only) and exposes:
 *   · lightweight metadata for indexes, the map, and region pages
 *   · the fully compiled essay (HTML + Map outline) for the reading page & panes
 *
 * To add a real essay: drop a .mdx file in content/essays with the frontmatter
 * shape below. Everything else (indexes, region grouping, next-links, the map
 * counts) updates automatically.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileEssay, type OutlineItem } from "./mdx";
import type { RegionSlug } from "@/content/regions";

const ESSAYS_DIR = path.join(process.cwd(), "content", "essays");

export interface EssayMeta {
  slug: string;
  title: string;
  /** Standfirst / subtitle. */
  dek: string;
  region: RegionSlug;
  /** The one-line Glance. */
  glance: string;
  /** A short structural intro shown at the "Map" depth. */
  summary: string;
  date: string;
  readingTime: number;
  /** The closing provocation — a question, not a quiz. */
  provocation: string;
  /** Explicit next essay; otherwise derived from the sequence. */
  next?: string;
  order: number;
  featured: boolean;
}

export interface Essay extends EssayMeta {
  html: string;
  outline: OutlineItem[];
}

function readRaw(slug: string): { data: Record<string, any>; content: string } | null {
  const file = path.join(ESSAYS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}

function toDateString(value: unknown): string {
  // YAML parses unquoted ISO dates into Date objects; normalise back to YYYY-MM-DD.
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === "string" ? value : "";
}

function toMeta(slug: string, data: Record<string, any>, content: string): EssayMeta {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: data.title ?? slug,
    dek: data.dek ?? "",
    region: data.region as RegionSlug,
    glance: data.glance ?? "",
    summary: data.summary ?? data.dek ?? "",
    date: toDateString(data.date),
    readingTime: Math.max(1, Math.round(words / 200)),
    provocation: data.provocation ?? "",
    next: data.next,
    order: typeof data.order === "number" ? data.order : 999,
    featured: Boolean(data.featured),
  };
}

export function getEssaySlugs(): string[] {
  if (!fs.existsSync(ESSAYS_DIR)) return [];
  return fs
    .readdirSync(ESSAYS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** All essay metadata, sorted into the canonical reading sequence. */
export function getAllEssays(): EssayMeta[] {
  return getEssaySlugs()
    .map((slug) => {
      const raw = readRaw(slug);
      return raw ? toMeta(slug, raw.data, raw.content) : null;
    })
    .filter((m): m is EssayMeta => m !== null)
    .sort((a, b) => a.order - b.order || a.date.localeCompare(b.date));
}

export function getEssaysByRegion(region: RegionSlug): EssayMeta[] {
  return getAllEssays().filter((e) => e.region === region);
}

export async function getEssay(slug: string): Promise<Essay | null> {
  const raw = readRaw(slug);
  if (!raw) return null;
  const meta = toMeta(slug, raw.data, raw.content);
  const { html, outline } = await compileEssay(raw.content);
  return { ...meta, html, outline };
}

/**
 * The essay the closing provocation hands you next. Prefer an explicit `next`,
 * otherwise the next in sequence, wrapping around so a reader never dead-ends.
 */
export function getNextEssay(slug: string): EssayMeta | null {
  const all = getAllEssays();
  if (all.length === 0) return null;
  const current = all.find((e) => e.slug === slug);
  if (current?.next) {
    return all.find((e) => e.slug === current.next) ?? null;
  }
  const idx = all.findIndex((e) => e.slug === slug);
  if (idx === -1) return all[0];
  return all[(idx + 1) % all.length];
}
