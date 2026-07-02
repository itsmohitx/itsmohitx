import Link from "next/link";
import { getAllEssays } from "@/lib/essays";
import { getAllSeeds } from "@/lib/seeds";
import { regions } from "@/content/regions";
import { site } from "@/lib/site";
import { HeroBand } from "@/components/site/HeroBand";

const READ_FIRST = "an-optimists-note";
const LEAD = "what-accelerates-a-civilization";
/** A real sentence from the lead essay, quoted verbatim. */
const LEAD_PULL =
  "If you measure the wrong thing, you reward the wrong thing. We have been doing it for twenty years.";

/**
 * The front page is an essay index. One catalog list carries the weight;
 * everything else stays out of its way. Each section has its own form: the
 * essays are the numbered catalog, the regions are one line of links, the
 * seeds are a compact two-column list. No decorative bands, no arrows.
 */
export default function HomePage() {
  const essays = getAllEssays();
  const readFirst = essays.find((e) => e.slug === READ_FIRST);
  const lead = essays.find((e) => e.slug === LEAD);
  const rest = essays.filter((e) => e.slug !== READ_FIRST && e.slug !== LEAD);
  const seeds = getAllSeeds();

  return (
    <div>
      <HeroBand />

      <div className="mx-auto max-w-[44rem] px-5 sm:px-8">
        {/* The statement. */}
        <header className="pt-12 sm:pt-16">
          <h1 className="font-display text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.015em] text-ink sm:text-[2.75rem]">
            {site.tagline}
          </h1>
          <p className="reading mt-6 max-w-measure">
            {site.description} The place to start checking my work is{" "}
            <a href={site.index.href} target="_blank" rel="noopener noreferrer">
              the e/acc Index
            </a>
            , {site.index.line.charAt(0).toLowerCase() + site.index.line.slice(1)} I build it
            in public and it ranks companies by what they actually move, so you can argue
            with every score.
          </p>
          {readFirst && (
            <p className="type-dek mt-5">
              New here? Read{" "}
              <Link
                href={`/writing/${readFirst.slug}`}
                className="text-accent underline underline-offset-4"
              >
                {readFirst.title}
              </Link>{" "}
              first. It sets the register for everything else.
            </p>
          )}
        </header>

        {/* The featured lead. */}
        {lead && (
          <section className="mt-16">
            <p className="type-label text-ink3">The lead essay</p>
            <Link href={`/writing/${lead.slug}`} className="group mt-2 block">
              <span className="block font-serif text-[1.6rem] font-semibold leading-[1.18] tracking-[-0.01em] text-ink transition-colors group-hover:text-accent sm:text-[2rem]">
                {lead.title}
              </span>
            </Link>
            {lead.dek && <p className="type-dek mt-3 max-w-measure">{lead.dek}</p>}
            <p className="mt-5 max-w-measure font-serif text-[1.25rem] italic leading-normal text-ink">
              &ldquo;{LEAD_PULL}&rdquo;
            </p>
            <p className="mt-4">
              <Link
                href={`/writing/${lead.slug}`}
                className="type-dek text-accent underline underline-offset-4"
              >
                Read the essay, {lead.readingTime} minutes
              </Link>
            </p>
          </section>
        )}

        {/* The catalog: every other essay, same treatment, number to time. */}
        <section className="mt-12">
          <ol className="border-t border-line/[.16]">
            {rest.map((e, i) => (
              <li key={e.slug} className="border-b border-line/[.16]">
                <Link
                  href={`/writing/${e.slug}`}
                  className="group grid grid-cols-[2.1rem_1fr] items-baseline gap-x-2 py-4 sm:grid-cols-[2.1rem_1fr_auto] sm:gap-x-4"
                >
                  <span className="type-meta">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="font-serif text-[1.1875rem] leading-snug text-ink transition-colors group-hover:text-accent">
                      {e.title}
                    </span>
                    <span className="type-dek mt-0.5 block">{e.glance}</span>
                  </span>
                  <span className="type-meta hidden sm:block">{e.readingTime} min</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* The territory: one line of links, the map carries the rest. */}
        <section className="mt-16">
          <h2 className="type-h2">The territory</h2>
          <p className="mt-3 max-w-measure font-serif text-[1.0625rem] leading-[1.9] text-ink">
            Every essay lives in one of five regions:{" "}
            {regions.map((r, i) => (
              <span key={r.slug}>
                <Link
                  href={`/regions/${r.slug}`}
                  className="underline decoration-line/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {r.title}
                </Link>
                {i < regions.length - 1 ? ", " : "."}
              </span>
            ))}{" "}
            <Link href="/regions" className="text-accent underline underline-offset-4">
              See the map
            </Link>
          </p>
        </section>

        {/* Seeds: short notes, titles only, two quiet columns. */}
        <section className="mt-14 pb-6">
          <h2 className="type-h2">Seeds, the short way in</h2>
          <ul className="mt-3 sm:columns-2 sm:gap-x-10">
            {seeds.map((s) => (
              <li key={s.slug} className="break-inside-avoid">
                <Link
                  href={`/seeds/${s.slug}`}
                  className="group flex min-h-11 items-center py-1.5"
                >
                  <span className="font-serif text-[1.0625rem] leading-snug text-ink transition-colors group-hover:text-accent">
                    {s.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
