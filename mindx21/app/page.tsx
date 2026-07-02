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
 * The front page is an essay index: one centered reading column, one featured
 * lead, then a calm scannable list. The hero line is the single place Fraunces
 * appears; everything else is the reading serif.
 */
export default function HomePage() {
  const essays = getAllEssays();
  const readFirst = essays.find((e) => e.slug === READ_FIRST);
  const lead = essays.find((e) => e.slug === LEAD);
  const rest = essays.filter((e) => e.slug !== READ_FIRST && e.slug !== LEAD);
  const seeds = getAllSeeds();
  const essayTitle = Object.fromEntries(essays.map((e) => [e.slug, e.title]));

  return (
    <div>
      <HeroBand />

      {/* The statement. */}
      <section className="mx-auto max-w-measure px-5 pt-10 sm:px-8 sm:pt-12">
        <h1 className="font-display text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.015em] text-ink sm:text-[2.75rem]">
          {site.tagline}
        </h1>
        <p className="reading mt-6">
          {site.description} The place to start checking my work is{" "}
          <a href={site.index.href} target="_blank" rel="noopener noreferrer">
            the e/acc Index
          </a>
          , {site.index.line.charAt(0).toLowerCase() + site.index.line.slice(1)} I build it in
          public and it ranks companies by what they actually move, so you can argue with
          every score.
        </p>
        {readFirst && (
          <p className="type-dek mt-5">
            New here? Read{" "}
            <Link href={`/writing/${readFirst.slug}`} className="text-accent underline underline-offset-4">
              {readFirst.title}
            </Link>{" "}
            first. It sets the register for everything else.
          </p>
        )}
      </section>

      {/* The essays: one featured lead, then a calm list. */}
      <section className="mx-auto mt-12 max-w-measure px-5 sm:px-8">
        <hr className="rule" />
        {lead && (
          <div className="pt-8">
            <p className="type-label">The lead essay</p>
            <Link href={`/writing/${lead.slug}`} className="group mt-2 block">
              <span className="block font-serif text-[1.7rem] font-semibold leading-[1.15] tracking-[-0.01em] text-ink transition-colors group-hover:text-accent sm:text-[2.1rem]">
                {lead.title}
              </span>
            </Link>
            <blockquote className="mt-5 border-l-2 border-accent/60 pl-5 font-serif text-[1.2rem] italic leading-normal text-ink sm:text-[1.3rem]">
              {LEAD_PULL}
            </blockquote>
            <p className="mt-4">
              <Link
                href={`/writing/${lead.slug}`}
                className="type-dek text-accent underline underline-offset-4"
              >
                Read the essay ({lead.readingTime} minutes) →
              </Link>
            </p>
          </div>
        )}

        {/* The rest: the first two carry a summary line, the remaining run compact. */}
        <ol className="mt-10 border-t border-line/[.16]">
          {rest.slice(0, 2).map((e, i) => (
            <li key={e.slug} className="border-b border-line/[.16]">
              <Link href={`/writing/${e.slug}`} className="group block py-4">
                <span className="flex items-baseline gap-4">
                  <span className="type-meta">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-[1.3rem] leading-snug text-ink transition-colors group-hover:text-accent">
                    {e.title}
                  </span>
                </span>
                <span className="type-dek mt-1 block pl-9">{e.glance}</span>
              </Link>
            </li>
          ))}
          {rest.slice(2).map((e, i) => (
            <li key={e.slug} className="border-b border-line/[.16]">
              <Link href={`/writing/${e.slug}`} className="group flex min-h-11 items-baseline gap-4 py-3">
                <span className="type-meta">{String(i + 3).padStart(2, "0")}</span>
                <span className="font-serif text-[1.1875rem] leading-snug text-ink transition-colors group-hover:text-accent">
                  {e.title}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Regions: the same centered column. The map lives at /regions. */}
      <section className="mx-auto mt-14 max-w-measure px-5 sm:px-8">
        <div className="flex items-baseline justify-between">
          <h2 className="type-h2">The territory</h2>
          <Link href="/regions" className="type-label text-accent underline underline-offset-4">
            See the map →
          </Link>
        </div>
        <ul className="mt-4">
          {regions.map((r) => (
            <li key={r.slug} className="border-t border-line/[.16] last:border-b">
              <Link href={`/regions/${r.slug}`} className="group block py-4">
                <span className="font-serif text-[1.1875rem] leading-snug text-ink transition-colors group-hover:text-accent">
                  {r.title}
                </span>
                <span className="type-dek mt-1 block">{r.glance}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Seeds: short entry notes, one calm list. */}
      <section className="mx-auto mt-14 max-w-measure px-5 pb-4 sm:px-8">
        <h2 className="type-h2">Seeds, the short way in</h2>
        <ul className="mt-4">
          {seeds.map((s) => (
            <li key={s.slug} className="border-t border-line/[.16] last:border-b">
              <Link href={`/seeds/${s.slug}`} className="group block min-h-11 py-3">
                <span className="font-serif text-[1.0625rem] leading-snug text-ink transition-colors group-hover:text-accent">
                  {s.title}
                </span>
                <span className="type-label mt-0.5 block text-ink3">
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
