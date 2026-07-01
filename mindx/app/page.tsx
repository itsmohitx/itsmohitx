import Link from "next/link";
import { getAllEssays } from "@/lib/essays";
import { getAllSeeds } from "@/lib/seeds";
import { regions } from "@/content/regions";
import { site } from "@/lib/site";
import { HeroBand } from "@/components/site/HeroBand";
import { HandMark } from "@/components/site/HandMark";

const READ_FIRST = "an-optimists-note";

/**
 * The editorial front page. Masthead and hairline live in the layout; here:
 * the full-bleed hero band, then an asymmetric two-column band (numbered
 * contents on the left, one flowing statement on the right), then regions and
 * seeds as plain full-width text bands. No cards, no centered hero stack.
 */
export default function HomePage() {
  const essays = getAllEssays();
  const readFirst = essays.find((e) => e.slug === READ_FIRST);
  const contents = essays.filter((e) => e.slug !== READ_FIRST);
  const seeds = getAllSeeds();
  const essayTitle = Object.fromEntries(essays.map((e) => [e.slug, e.title]));

  return (
    <div>
      <HeroBand />

      {/* The front-page band: asymmetric, left contents, right statement. */}
      <section className="mx-auto max-w-wide px-5 pt-10 sm:px-8 sm:pt-14">
        <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,19rem)_1fr]">
          {/* RIGHT on desktop reads first in source for a11y: the statement. */}
          <div className="lg:order-2">
            <h1 className="font-serif text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-[3.8rem] lg:-ml-24">
              <span className="relative inline-block">
                {site.tagline}
                <HandMark className="absolute -bottom-[0.18em] left-0" />
              </span>
            </h1>
            <p className="reading mt-8 max-w-[36rem] text-[1.15rem] sm:text-[1.25rem]">
              {site.description} The place to start checking my work is{" "}
              <a href={site.index.href} target="_blank" rel="noopener noreferrer">
                the e/acc Index
              </a>
              , {site.index.line.charAt(0).toLowerCase() + site.index.line.slice(1)} I build it
              in public and it ranks companies by what they actually move, so you can argue
              with every score.
            </p>
            {readFirst && (
              <p className="mt-6 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-ink2">
                New here? Read first:{" "}
                <Link href={`/writing/${readFirst.slug}`} className="text-accent underline underline-offset-4">
                  {readFirst.title}
                </Link>
              </p>
            )}
          </div>

          {/* LEFT: the numbered contents. Top padding on wide screens lets the
              oversized headline cross into this column over empty space. */}
          <nav aria-label="Contents" className="lg:order-1 lg:pt-24">
            <p className="label">Contents · the essays</p>
            <ol className="mt-5">
              {contents.map((e, i) => (
                <li key={e.slug} className="border-t border-line/[.16] first:border-t-0">
                  <Link href={`/writing/${e.slug}`} className="group flex items-baseline gap-4 py-3.5">
                    <span
                      className={`font-mono text-ink3 ${
                        i === 0 ? "text-[1.7rem] leading-none text-accent" : "text-[0.78rem]"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-[1.05rem] leading-snug text-ink transition-colors group-hover:text-accent">
                      {e.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* Regions: full-width rows, no grid, no cards. */}
      <section className="mt-16 sm:mt-20">
        <div className="mx-auto max-w-wide px-5 sm:px-8">
          <p className="label">The territory · five regions</p>
        </div>
        <div className="mt-5">
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

      {/* Seeds: short entry notes as a plain two-column text list. */}
      <section className="mx-auto mt-16 max-w-wide px-5 sm:mt-20 sm:px-8">
        <p className="label">Seeds · short ways in</p>
        <ul className="mt-5 grid gap-x-14 sm:grid-cols-2">
          {seeds.map((s) => (
            <li key={s.slug} className="border-t border-line/[.16]">
              <Link href={`/seeds/${s.slug}`} className="group block py-3.5">
                <span className="font-serif text-[1.05rem] leading-snug text-ink transition-colors group-hover:text-accent">
                  {s.title}
                </span>
                <span className="mt-0.5 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink3">
                  opens into {essayTitle[s.links_to] ?? "an essay"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
