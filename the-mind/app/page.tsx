import Link from "next/link";
import { RegionsMap } from "@/components/map/RegionsMap";
import { getAllEssays } from "@/lib/essays";
import { regions } from "@/content/regions";

export default function HomePage() {
  const essays = getAllEssays();
  const featured = essays.filter((e) => e.featured).slice(0, 3);
  const showcase = featured.length ? featured : essays.slice(0, 3);

  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      {/* Hero */}
      <section className="pb-16 pt-20 sm:pt-28">
        <p className="eyebrow">The public face of a working thinker</p>
        <h1 className="mt-6 max-w-4xl font-serif text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.02em] text-ink text-balance sm:text-6xl">
          Frontier technology, and where it takes humanity.
        </h1>
        <p className="mt-7 max-w-2xl font-serif text-xl font-light leading-relaxed text-muted sm:text-2xl">
          Not a blog, not a portfolio. A living map of how I see the world — follow
          one idea to the next, and read at whatever depth you choose.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/writing"
            className="rounded-full bg-amber px-5 py-2.5 font-sans text-[0.92rem] font-medium text-bg transition-opacity hover:opacity-90"
          >
            Read the writing →
          </Link>
          <a
            href="#regions"
            className="rounded-full border border-line/25 px-5 py-2.5 font-sans text-[0.92rem] text-ink transition-colors hover:border-amber/50"
          >
            Enter the map ↓
          </a>
        </div>
      </section>

      {/* The regions map */}
      <section id="regions" className="scroll-mt-24 border-t border-line/10 py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">The regions</p>
            <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
              How the ideas connect
            </h2>
          </div>
          <Link
            href="/regions"
            className="shrink-0 font-sans text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            Index view →
          </Link>
        </div>
        <RegionsMap />
        <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-muted">
          Six regions of a single worldview. The edges between them are
          first-class: the non-obvious links are where the thinking actually lives.
        </p>
      </section>

      {/* Featured writing */}
      <section className="border-t border-line/10 py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Start here</p>
            <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">Featured essays</h2>
          </div>
          <Link
            href="/writing"
            className="shrink-0 font-sans text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            All writing →
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {showcase.map((e) => {
            const region = regions.find((r) => r.slug === e.region);
            return (
              <li key={e.slug}>
                <Link
                  href={`/writing/${e.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line/12 bg-surface/40 p-6 transition-colors hover:border-amber/40 hover:bg-surface"
                >
                  {region && <span className="eyebrow text-amber/80">{region.short}</span>}
                  <span className="mt-3 font-serif text-xl leading-snug text-ink transition-colors group-hover:text-amber">
                    {e.title}
                  </span>
                  <span className="mt-2 flex-1 font-sans text-sm leading-relaxed text-muted">
                    {e.glance}
                  </span>
                  <span className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-faint">
                    {e.readingTime} min
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* How to read */}
      <section className="border-t border-line/10 py-14">
        <p className="eyebrow">How to read this</p>
        <div className="mt-6 grid gap-8 sm:grid-cols-3">
          <HowItem
            n="01"
            title="At any depth"
            body="Every essay reads at a glance, as a map, or in full. You choose how far in to go — depth is a setting, not a wall."
          />
          <HowItem
            n="02"
            title="Along the trails"
            body="Follow a linked idea and it opens beside the one you're reading, so you can see the path your own curiosity took."
          />
          <HowItem
            n="03"
            title="However you like"
            body="Or ignore all of it. The top nav, real links, and a plain index work everywhere. The flourishes are never a tax."
          />
        </div>
      </section>
    </div>
  );
}

function HowItem({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div>
      <span className="font-mono text-sm text-amber/70">{n}</span>
      <h3 className="mt-2 font-serif text-lg text-ink">{title}</h3>
      <p className="mt-1.5 font-sans text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
