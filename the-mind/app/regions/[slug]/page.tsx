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
  return { title: region.title, description: region.glance };
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
  const accentColor = region.accent === "amber" ? "rgb(var(--amber))" : "rgb(var(--oxblood))";

  return (
    <div className="mx-auto max-w-wide px-5 py-10 sm:px-8">
      <PageNav
        crumbs={[
          { label: "Mind", href: "/" },
          { label: "Regions", href: "/regions" },
          { label: region.short },
        ]}
        backHref="/regions"
      />

      <header className="mb-14 max-w-measure">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: accentColor, boxShadow: `0 0 18px ${accentColor}` }}
          />
          <p className="eyebrow">Region</p>
        </div>
        <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink text-balance sm:text-5xl">
          {region.title}
        </h1>
        <p className="mt-5 font-serif text-2xl font-light leading-snug text-amber/90">
          {region.glance}
        </p>
        <p className="reading mt-6 text-lg">{region.blurb}</p>
      </header>

      {/* Essays in this region */}
      <section className="mb-16">
        <h2 className="eyebrow mb-5">Essays in this region</h2>
        {essays.length ? (
          <ul className="border-t border-line/10">
            {essays.map((e) => (
              <li key={e.slug} className="border-b border-line/10">
                <Link
                  href={`/writing/${e.slug}`}
                  className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="font-serif text-xl text-ink transition-colors group-hover:text-amber">
                    {e.title}
                  </span>
                  <span className="font-sans text-sm text-muted sm:max-w-md sm:text-right">
                    {e.glance}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Essays for this region are on the way.</p>
        )}
      </section>

      {/* Entry notes (seeds) for this region */}
      {seeds.length > 0 && (
        <section className="mb-16">
          <h2 className="eyebrow mb-5">Entry notes</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {seeds.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/seeds/${s.slug}`}
                  className="group block h-full rounded-2xl border border-line/12 bg-surface/40 p-5 transition-colors hover:border-amber/40 hover:bg-surface"
                >
                  <span className="font-serif text-lg leading-snug text-ink transition-colors group-hover:text-amber">
                    {s.title}
                  </span>
                  <span className="mt-1.5 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">
                    {s.readingTime} min entry note
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Connections, the edges are content */}
      <section>
        <h2 className="eyebrow mb-5">How this connects</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {links.map(({ region: other, why }) => (
            <li key={other.slug}>
              <Link
                href={`/regions/${other.slug}`}
                className="group block h-full rounded-2xl border border-line/12 bg-surface/40 p-5 transition-colors hover:border-amber/40 hover:bg-surface"
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor:
                        other.accent === "amber" ? "rgb(var(--amber))" : "rgb(var(--oxblood))",
                    }}
                  />
                  <span className="font-serif text-lg text-ink transition-colors group-hover:text-amber">
                    {other.short}
                  </span>
                  <span aria-hidden className="ml-auto text-faint transition-colors group-hover:text-amber">
                    →
                  </span>
                </div>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{why}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
