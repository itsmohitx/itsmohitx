import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { regions, getRegion, connectionsFor } from "@/content/regions";
import { getEssaysByRegion } from "@/lib/essays";
import { getSeedsByRegion } from "@/lib/seeds";
import { PageNav } from "@/components/site/PageNav";

export function generateStaticParams() {
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) return {};
  return {
    title: region.title,
    description: region.glance,
    alternates: { canonical: `/regions/${slug}` },
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();

  const essays = getEssaysByRegion(region.slug);
  const seeds = getSeedsByRegion(region.slug);
  const links = connectionsFor(region.slug);

  return (
    <div className="mx-auto max-w-wide px-5 py-10 sm:px-8">
      <PageNav
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Regions", href: "/regions" },
          { label: region.short },
        ]}
      />

      <header className="mb-12 max-w-measure">
        <h1 className="type-h1 text-balance">
          {region.title}
        </h1>
        <p className="mt-5 font-serif text-xl font-light leading-relaxed text-accent sm:text-[1.3rem]">
          {region.glance}
        </p>
        <p className="reading mt-6 text-lg">{region.blurb}</p>
      </header>

      {/* Essays: title with the description left-aligned directly beneath it. */}
      <section className="mb-14">
        <h2 className="type-h2 mb-4">Essays in this region</h2>
        {essays.length ? (
          <ul>
            {essays.map((e) => (
              <li key={e.slug} className="border-t border-line/[.16] last:border-b">
                <Link href={`/writing/${e.slug}`} className="group block max-w-2xl py-4">
                  <span className="font-serif text-xl text-ink transition-colors group-hover:text-accent">
                    {e.title}
                  </span>
                  <span className="mt-1 block font-serif text-[0.95rem] leading-relaxed text-ink2">
                    {e.glance}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink2">Essays for this region are on the way.</p>
        )}
      </section>

      {seeds.length > 0 && (
        <section className="mb-14">
          <h2 className="type-h2 mb-4">Short notes here</h2>
          <ul className="grid gap-x-14 sm:grid-cols-2">
            {seeds.map((s) => (
              <li key={s.slug} className="border-t border-line/[.16]">
                <Link href={`/seeds/${s.slug}`} className="group block min-h-11 py-3.5">
                  <span className="font-serif text-[1.05rem] leading-snug text-ink transition-colors group-hover:text-accent">
                    {s.title}
                  </span>
                  <span className="mt-0.5 block type-label">
                    a {s.readingTime} minute note
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="type-h2 mb-4">How this connects</h2>
        <ul>
          {links.map(({ region: other, why }) => (
            <li key={other.slug} className="border-t border-line/[.16] last:border-b">
              <Link href={`/regions/${other.slug}`} className="group block max-w-2xl py-4">
                <span className="font-serif text-lg text-ink transition-colors group-hover:text-accent">
                  {other.short} <span aria-hidden className="text-accent">→</span>
                </span>
                <span className="mt-1 block font-serif text-[0.95rem] leading-relaxed text-ink2">
                  {why}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
