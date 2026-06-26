import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getEssaySlugs } from "@/lib/essays";
import { getSeedSlugs } from "@/lib/seeds";
import { regions } from "@/content/regions";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const lastModified = new Date("2026-06-26");
  const paths = [
    "",
    "/writing",
    "/regions",
    "/about",
    "/now",
    ...regions.map((r) => `/regions/${r.slug}`),
    ...getEssaySlugs().map((s) => `/writing/${s}`),
    ...getSeedSlugs().map((s) => `/seeds/${s}`),
  ];
  return paths.map((p) => ({ url: `${base}${p}`, lastModified }));
}
