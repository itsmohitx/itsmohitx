import { NextResponse } from "next/server";
import { getEssay, getEssaySlugs } from "@/lib/essays";
import { getRegion } from "@/content/regions";

/**
 * Returns a single essay's compiled HTML + metadata as JSON, so the trail reader
 * can open it in a pane without a full navigation. Static per slug (the corpus is
 * known at build time), which keeps it instant and cacheable.
 */
// Prerendered to a static JSON file per slug so it works under static export.
export const dynamic = "force-static";

export async function generateStaticParams() {
  return getEssaySlugs().map((slug) => ({ slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const region = getRegion(essay.region);
  return NextResponse.json({
    slug: essay.slug,
    title: essay.title,
    dek: essay.dek,
    glance: essay.glance,
    readingTime: essay.readingTime,
    region: region ? { slug: region.slug, short: region.short } : null,
    html: essay.html,
  });
}
