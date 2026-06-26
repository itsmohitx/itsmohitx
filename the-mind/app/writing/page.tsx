import type { Metadata } from "next";
import Link from "next/link";
import { getAllEssays } from "@/lib/essays";
import { getRegion } from "@/content/regions";
import { PageNav } from "@/components/site/PageNav";

export const metadata: Metadata = {
  title: "Writing",
  description: "The essays. Deep takes on frontier technology and where it takes humanity.",
};

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export default function WritingIndex() {
  const essays = getAllEssays();

  return (
    <div className="mx-auto max-w-wide px-5 py-10 sm:px-8">
      <PageNav crumbs={[{ label: "Mind", href: "/" }, { label: "Writing" }]} backHref="/" />

      <header className="mb-12 max-w-2xl">
        <p className="eyebrow">The writing</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Essays
        </h1>
        <p className="mt-5 font-serif text-xl font-light leading-relaxed text-muted">
          The substance. Deep takes on frontier technology and where it takes
          humanity. Read at a glance, as a map, or in full.
        </p>
      </header>

      <ul className="border-t border-line/10">
        {essays.map((e) => {
          const region = getRegion(e.region);
          return (
            <li key={e.slug} className="border-b border-line/10">
              <Link
                href={`/writing/${e.slug}`}
                className="group grid gap-2 py-7 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8"
              >
                <div className="max-w-2xl">
                  {region && <span className="eyebrow text-amber/80">{region.short}</span>}
                  <h2 className="mt-2 font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-amber sm:text-[1.7rem]">
                    {e.title}
                  </h2>
                  <p className="mt-2 font-sans text-[0.95rem] leading-relaxed text-muted">
                    {e.glance}
                  </p>
                </div>
                <div className="shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-faint sm:pt-2 sm:text-right">
                  <span>{formatDate(e.date)}</span>
                  <span className="mx-2 sm:hidden">·</span>
                  <span className="sm:mt-1 sm:block">{e.readingTime} min</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
