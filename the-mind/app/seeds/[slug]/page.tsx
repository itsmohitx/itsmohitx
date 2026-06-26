import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSeed, getSeedSlugs } from "@/lib/seeds";
import { getAllEssays } from "@/lib/essays";
import { getRegion } from "@/content/regions";
import { site } from "@/lib/site";
import { PageNav } from "@/components/site/PageNav";
import { SeedView } from "@/components/reading/SeedView";
import { TrailReader } from "@/components/trail/TrailReader";

export function generateStaticParams() {
  return getSeedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seed = await getSeed(slug);
  if (!seed) return {};
  return {
    title: seed.title,
    description: `${seed.title}. A short note that opens into the essay.`,
    openGraph: { title: `${seed.title} · ${site.name}`, type: "article" },
  };
}

export default async function SeedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seed = await getSeed(slug);
  if (!seed) notFound();

  const region = getRegion(seed.region);
  const pillar = getAllEssays().find((e) => e.slug === seed.links_to) ?? null;

  const crumbs = [
    { label: "Mind", href: "/" },
    ...(region ? [{ label: region.short, href: `/regions/${region.slug}` }] : []),
    { label: seed.title },
  ];

  return (
    <div className="mx-auto max-w-wide px-5 py-10 sm:px-8">
      <PageNav crumbs={crumbs} backHref="/" />
      <TrailReader baseSlug={slug} baseTitle={seed.title}>
        <SeedView seed={seed} pillar={pillar} />
      </TrailReader>
    </div>
  );
}
