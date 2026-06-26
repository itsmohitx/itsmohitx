import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEssay, getEssaySlugs, getNextEssay } from "@/lib/essays";
import { getRegion } from "@/content/regions";
import { site } from "@/lib/site";
import { PageNav } from "@/components/site/PageNav";
import { EssayView } from "@/components/reading/EssayView";
import { TrailReader } from "@/components/trail/TrailReader";

export function generateStaticParams() {
  return getEssaySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay) return {};
  return {
    title: essay.title,
    description: essay.glance || essay.dek,
    openGraph: {
      title: `${essay.title} · ${site.name}`,
      description: essay.glance || essay.dek,
      type: "article",
    },
  };
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay) notFound();

  const region = getRegion(essay.region);
  const next = getNextEssay(slug);

  const crumbs = [
    { label: "Mind", href: "/" },
    { label: "Writing", href: "/writing" },
    ...(region ? [{ label: region.short, href: `/regions/${region.slug}` }] : []),
    { label: essay.title },
  ];

  return (
    <div className="mx-auto max-w-wide px-5 py-10 sm:px-8">
      <PageNav crumbs={crumbs} backHref="/writing" />
      <TrailReader baseSlug={slug} baseTitle={essay.title}>
        <EssayView essay={essay} next={next} />
      </TrailReader>
    </div>
  );
}
