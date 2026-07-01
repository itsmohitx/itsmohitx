import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEssay, getEssaySlugs, getNextEssay } from "@/lib/essays";
import { getSeedsForPillar } from "@/lib/seeds";
import { getRegion } from "@/content/regions";
import { site } from "@/lib/site";
import Link from "next/link";
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
  const og = `/og/${slug}.png`;
  return {
    title: essay.title,
    description: essay.glance || essay.dek,
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      title: `${essay.title} · ${site.name}`,
      description: essay.glance || essay.dek,
      type: "article",
      images: [{ url: og, width: 1200, height: 630, alt: essay.title }],
    },
    twitter: { card: "summary_large_image", images: [og] },
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
  const doorways = getSeedsForPillar(slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: essay.title,
    description: essay.glance || essay.dek,
    datePublished: essay.date,
    author: { "@type": "Person", name: site.author, url: site.url, sameAs: [site.x.href] },
    url: `${site.url}/writing/${slug}`,
    image: `${site.url}/og/${slug}.png`,
  };

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Writing", href: "/writing" },
    ...(region ? [{ label: region.short, href: `/regions/${region.slug}` }] : []),
    { label: essay.title },
  ];

  return (
    <div className="mx-auto max-w-wide px-5 py-10 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <PageNav crumbs={crumbs} backHref="/writing" />
      <TrailReader baseSlug={slug} baseTitle={essay.title}>
        <EssayView essay={essay} next={next} />
        {doorways.length > 0 && (
          <aside className="mx-auto mt-14 max-w-measure border-t border-line/[.16] pt-5">
            <p className="label">Short doorways into this essay</p>
            <ul className="mt-2">
              {doorways.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/seeds/${s.slug}`}
                    className="group inline-block py-1.5 font-serif text-[1.02rem] text-ink transition-colors hover:text-accent"
                  >
                    {s.title} <span aria-hidden className="text-accent">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </TrailReader>
    </div>
  );
}
