import type { Metadata } from "next";
import Link from "next/link";
import { getAllEssays } from "@/lib/essays";
import { getAllSeeds } from "@/lib/seeds";
import { getRegion } from "@/content/regions";
import { PageNav } from "@/components/site/PageNav";

export const metadata: Metadata = {
  title: "Writing",
  description: "The essays: where frontier technology is taking us, and who it leaves behind.",
  alternates: { canonical: "/writing" },
};

export default function WritingIndex() {
  const essays = getAllEssays();
  const seeds = getAllSeeds();
  const essayTitle = Object.fromEntries(essays.map((e) => [e.slug, e.title]));

  return (
    <div className="mx-auto max-w-wide px-5 py-10 sm:px-8">
      <PageNav crumbs={[{ label: "Home", href: "/" }, { label: "Writing" }]} />

      <header className="mb-10 max-w-2xl">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Essays
        </h1>
      </header>

      <ol>
        {essays.map((e, i) => {
          const region = getRegion(e.region);
          return (
            <li key={e.slug} className="border-t border-line/[.16] last:border-b">
              <Link
                href={`/writing/${e.slug}`}
                className="group grid gap-x-8 gap-y-1 py-6 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline"
              >
                <span className="font-mono text-[0.78rem] text-ink3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="max-w-2xl">
                  <span className="block font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-accent">
                    {e.title}
                  </span>
                  <span className="mt-1.5 block font-serif text-[0.95rem] leading-relaxed text-ink2">
                    {e.glance}
                  </span>
                  {region && (
                    <span className="mt-1 block font-serif text-[0.85rem] italic text-ink2">
                      {region.short}
                    </span>
                  )}
                </span>
                <span className="font-serif text-[0.85rem] text-ink2 sm:text-right">
                  {e.readingTime} min
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <section className="mt-16">
        <h2 className="font-serif text-xl text-ink">Seeds, the short way in</h2>
        <ul className="mt-4 grid gap-x-14 sm:grid-cols-2">
          {seeds.map((s) => (
            <li key={s.slug} className="border-t border-line/[.16]">
              <Link href={`/seeds/${s.slug}`} className="group block min-h-11 py-3.5">
                <span className="font-serif text-[1.05rem] leading-snug text-ink transition-colors group-hover:text-accent">
                  {s.title}
                </span>
                <span className="mt-0.5 block font-serif text-[0.85rem] italic text-ink2">
                  From the essay: {essayTitle[s.links_to] ?? ""}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
