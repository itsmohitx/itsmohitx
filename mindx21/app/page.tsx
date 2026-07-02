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
 * The editorial front page. One essay leads the essays area large, with a
 * verbatim pull-quote; the rest sit smaller and uneven beneath it. No dates.
 * Plain-language labels; mono uppercase stays in the navigation.
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
      <section className="mx-auto max-w-wide px-5 pt-10 sm:px-8 sm:pt-14">
        <h1 className="type-h1">{site.tagline}</h1>
        <p className="reading mt-7 max-w-[38rem] text-[1.15rem] sm:text-[1.25rem]">
          {site.description} The place to start checking my work is{" "}
          <a href={site.index.href} target="_blank" rel="noopener noreferrer">
            the e/acc Index
          </a>
          , {site.index.line.charAt(0).toLowerCase() + site.index.line.slice(1)} I build it in
          public and it ranks companies by what they actually move, so you can argue with
          every score.
        </p>
        {readFirst && (
          <p className="mt-6 font-serif text-[1.02rem] text-ink2">
            New here? Read{" "}
            <Link href={`/writing/${readFirst.slug}`} className="text-accent underline underline-offset-4">
              {readFirst.title}
            </Link>{" "}
            first. It sets the register for everything else.
          </p>
        )}
      </section>

      {/* The essays: one clear lead, the rest smaller and uneven beneath it. */}
      <section className="mt-14 border-t border-line/[.16] sm:mt-16">
        <div className="mx-auto max-w-wide px-5 py-10 sm:px-8 sm:py-14">
          {lead && (
            <div className="max-w-3xl">
              <p className="type-label">The lead essay</p>
              <Link href={`/writing/${lead.slug}`} className="group mt-3 block">
                <span className="block font-serif text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.015em] text-ink transition-colors group-hover:text-accent sm:text-[2.6rem]">
                  {lead.title}
                </span>
              </Link>
              <blockquote className="mt-6 max-w-2xl border-l-2 border-accent/60 pl-5 font-serif text-[1.25rem] font-light italic leading-snug text-ink sm:text-[1.5rem]">
                {LEAD_PULL}
              </blockquote>
              <p className="mt-5">
                <Link
                  href={`/writing/${lead.slug}`}
                  className="font-serif text-[1.02rem] text-accent underline underline-offset-4"
                >
                  Read the essay ({lead.readingTime} minutes) →
                </Link>
              </p>
            </div>
          )}

          {/* The rest, deliberately smaller and uneven: the first two carry a
              summary line, the remaining four run compact. */}
          <ol className="mt-12 max-w-2xl border-t border-line/[.16]">
            {rest.slice(0, 2).map((e, i) => (
              <li key={e.slug} className="border-b border-line/[.16]">
                <Link href={`/writing/${e.slug}`} className="group block py-4">
                  <span className="flex items-baseline gap-4">
                    <span className="type-meta">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-[1.25rem] leading-snug text-ink transition-colors group-hover:text-accent">
                      {e.title}
                    </span>
                  </span>
                  <span className="mt-1 block pl-9 font-serif text-[0.95rem] leading-relaxed text-ink2">
                    {e.glance}
                  </span>
                </Link>
              </li>
            ))}
            {rest.slice(2).map((e, i) => (
              <li key={e.slug} className="border-b border-line/[.16]">
                <Link href={`/writing/${e.slug}`} className="group flex min-h-11 items-baseline gap-4 py-2.5">
                  <span className="type-meta">
                    {String(i + 3).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-[1.02rem] leading-snug text-ink transition-colors group-hover:text-accent">
                    {e.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Regions: full-width rows. The map lives at /regions. */}
      <section className="mt-2 sm:mt-4">
        <div className="mx-auto flex max-w-wide items-baseline justify-between px-5 sm:px-8">
          <h2 className="type-h2">The territory</h2>
          <Link
            href="/regions"
            className="font-serif text-[0.95rem] text-accent underline underline-offset-4"
          >
            See the map →
          </Link>
        </div>
        <div className="mt-4">
          {regions.map((r) => (
            <div key={r.slug} className="border-t border-line/[.16] last:border-b">
              <Link
                href={`/regions/${r.slug}`}
                className="group mx-auto flex max-w-wide flex-col gap-1 px-5 py-5 sm:flex-row sm:items-baseline sm:gap-10 sm:px-8"
              >
                <span className="w-56 shrink-0 font-serif text-[1.35rem] font-medium leading-snug text-ink transition-colors group-hover:text-accent">
                  {r.title}
                </span>
                <span className="font-serif text-[0.98rem] leading-relaxed text-ink2">
                  {r.glance}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Seeds: short entry notes. */}
      <section className="mx-auto mt-16 max-w-wide px-5 pb-4 sm:mt-20 sm:px-8">
        <h2 className="type-h2">Seeds, the short way in</h2>
        <ul className="mt-4 grid gap-x-14 sm:grid-cols-2">
          {seeds.map((s) => (
            <li key={s.slug} className="border-t border-line/[.16]">
              <Link href={`/seeds/${s.slug}`} className="group block min-h-11 py-3.5">
                <span className="font-serif text-[1.05rem] leading-snug text-ink transition-colors group-hover:text-accent">
                  {s.title}
                </span>
                <span className="mt-0.5 block type-label">
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
