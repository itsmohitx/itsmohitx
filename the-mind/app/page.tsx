import Link from "next/link";
import { RegionsMap } from "@/components/map/RegionsMap";
import { getAllEssays } from "@/lib/essays";
import { getAllSeeds } from "@/lib/seeds";
import { regions } from "@/content/regions";

const KEYSTONE = "what-accelerates-a-civilization";

export default function HomePage() {
  const essays = getAllEssays();
  const featured = essays.find((e) => e.featured);
  const pillars = essays.filter((e) => !e.featured);
  const seeds = getAllSeeds();
  const essayTitle = Object.fromEntries(essays.map((e) => [e.slug, e.title]));

  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      {/* Hero, the thesis */}
      <section className="pb-14 pt-20 sm:pt-28">
        <p className="eyebrow">The public face of a working thinker</p>
        <h1 className="mt-6 max-w-4xl font-serif text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[3.6rem]">
          Optimist about the technology. Skeptic about who ends up holding it.
        </h1>
        <p className="mt-7 max-w-2xl font-serif text-xl font-light leading-relaxed text-muted sm:text-2xl">
          I write about where frontier technology is taking us, and who it leaves behind. AI, space,
          biology, and the patterns that decide whether the future is shared or captured.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          {featured && (
            <Link
              href={`/writing/${featured.slug}`}
              className="rounded-full bg-amber px-5 py-2.5 font-sans text-[0.92rem] font-medium text-bg transition-opacity hover:opacity-90"
            >
              Read An Optimist&apos;s Note →
            </Link>
          )}
          <a
            href="#regions"
            className="rounded-full border border-line/25 px-5 py-2.5 font-sans text-[0.92rem] text-ink transition-colors hover:border-amber/50"
          >
            Enter the map ↓
          </a>
        </div>
      </section>

      {/* Read this first */}
      {featured && (
        <section className="border-t border-line/10 py-10">
          <Link
            href={`/writing/${featured.slug}`}
            className="group block rounded-2xl border border-line/15 bg-surface/40 p-7 transition-colors hover:border-amber/40 hover:bg-surface"
          >
            <span className="eyebrow text-amber/80">Read this first</span>
            <span className="mt-2 block font-serif text-2xl text-ink transition-colors group-hover:text-amber">
              {featured.title}
            </span>
            <span className="mt-2 block max-w-2xl font-sans text-[0.97rem] leading-relaxed text-muted">
              {featured.glance}
            </span>
          </Link>
        </section>
      )}

      {/* The regions map */}
      <section id="regions" className="scroll-mt-24 border-t border-line/10 py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">The regions</p>
            <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">How the ideas connect</h2>
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
          Five regions of a single worldview. The edges between them are first-class: the
          non-obvious links are where the thinking actually lives.
        </p>
      </section>

      {/* The essays, led by the keystone */}
      <section className="border-t border-line/10 py-14">
        <div className="mb-8">
          <p className="eyebrow">The writing</p>
          <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">The essays</h2>
        </div>
        <ul className="border-t border-line/10">
          {pillars.map((e) => (
            <li key={e.slug} className="border-b border-line/10">
              <Link
                href={`/writing/${e.slug}`}
                className="group grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8"
              >
                <div className="max-w-2xl">
                  {e.slug === KEYSTONE && (
                    <span className="eyebrow text-amber/80">The keystone</span>
                  )}
                  <span className="mt-1 block font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-amber">
                    {e.title}
                  </span>
                  <span className="mt-2 block font-sans text-[0.95rem] leading-relaxed text-muted">
                    {e.glance}
                  </span>
                </div>
                <span className="shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-faint sm:pt-2 sm:text-right">
                  {e.readingTime} min
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Seeds, the doorways */}
      <section className="border-t border-line/10 py-14">
        <div className="mb-8">
          <p className="eyebrow">Seeds</p>
          <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">Short ways in</h2>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-muted">
            A single idea each, and a door into one of the essays. On desktop the essay opens in a
            pane beside the note.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {seeds.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/seeds/${s.slug}`}
                className="group block h-full rounded-2xl border border-line/12 bg-surface/40 p-5 transition-colors hover:border-amber/40 hover:bg-surface"
              >
                <span className="block font-serif text-lg leading-snug text-ink transition-colors group-hover:text-amber">
                  {s.title}
                </span>
                <span className="mt-1.5 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">
                  Leads to {essayTitle[s.links_to] ?? "an essay"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* How to read */}
      <section className="border-t border-line/10 py-14">
        <p className="eyebrow">How to read this</p>
        <div className="mt-6 grid gap-8 sm:grid-cols-3">
          <HowItem
            n="01"
            title="At any depth"
            body="Every essay reads at a glance, as a map, or in full. You choose how far in to go. Depth is a setting, not a wall."
          />
          <HowItem
            n="02"
            title="Along the trails"
            body="Follow a linked idea and it opens beside the one you are reading, so you can see the path your own curiosity took."
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
