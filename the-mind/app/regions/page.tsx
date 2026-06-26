import type { Metadata } from "next";
import Link from "next/link";
import { regions } from "@/content/regions";
import { getEssaysByRegion } from "@/lib/essays";
import { PageNav } from "@/components/site/PageNav";

export const metadata: Metadata = {
  title: "Regions",
  description: "The five regions of a single worldview, the real territory of how Mohit Jain thinks.",
};

export default function RegionsIndex() {
  return (
    <div className="mx-auto max-w-wide px-5 py-10 sm:px-8">
      <PageNav crumbs={[{ label: "Mind", href: "/" }, { label: "Regions" }]} backHref="/" />

      <header className="mb-12 max-w-2xl">
        <p className="eyebrow">The territory</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Regions
        </h1>
        <p className="mt-5 font-serif text-xl font-light leading-relaxed text-muted">
          Five regions of a single worldview. Each is a domain of how I think; the
          edges between them are where the real thinking lives.
        </p>
      </header>

      <ul className="grid gap-px overflow-hidden rounded-2xl border border-line/12 bg-line/10 sm:grid-cols-2">
        {regions.map((r) => {
          const count = getEssaysByRegion(r.slug).length;
          return (
            <li key={r.slug} className="bg-bg">
              <Link
                href={`/regions/${r.slug}`}
                className="group flex h-full flex-col p-7 transition-colors hover:bg-surface/50"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        r.accent === "amber" ? "rgb(var(--amber))" : "rgb(var(--oxblood))",
                      boxShadow: `0 0 14px ${
                        r.accent === "amber" ? "rgb(var(--amber) / 0.6)" : "rgb(var(--oxblood) / 0.6)"
                      }`,
                    }}
                  />
                  <h2 className="font-serif text-2xl text-ink transition-colors group-hover:text-amber">
                    {r.title}
                  </h2>
                </div>
                <p className="mt-3 flex-1 font-sans text-[0.95rem] leading-relaxed text-muted">
                  {r.glance}
                </p>
                <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-faint">
                  {count} {count === 1 ? "essay" : "essays"}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
