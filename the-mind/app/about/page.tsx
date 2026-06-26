import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageNav } from "@/components/site/PageNav";

export const metadata: Metadata = {
  title: "About",
  description: "Who's behind The Mind — and what it's for.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-wide px-5 py-10 sm:px-8">
      <PageNav crumbs={[{ label: "Mind", href: "/" }, { label: "About" }]} backHref="/" />

      <article className="mx-auto max-w-measure">
        <header className="mb-12">
          <p className="eyebrow">About</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            A working thinker, building in the open.
          </h1>
        </header>

        <div className="reading text-lg">
          <p>
            I&apos;m Mohit. I build things on the frontier of technology and I write
            about where that frontier is taking us. This site isn&apos;t a blog and it
            isn&apos;t a portfolio — both of those are filing cabinets. It&apos;s closer
            to a model of how I think: a worldview you can enter through a map, follow
            from one idea to the next, and read at whatever depth you like.
          </p>
          <p>
            The register I aim for is Naval&apos;s clarity with a16z&apos;s substance —
            optimistic and conviction-driven, never doomer. I believe the most
            interesting part of any idea is the non-obvious connection: that every
            liberating technology gets recaptured into concentration, that the real
            danger of AI is the business model rather than the machine, that leaving
            Earth and curing aging are the same bet on a bigger future. The edges are
            where the thinking lives, so this site treats them as first-class.
          </p>
          <h2>What you&apos;ll find here</h2>
          <p>
            Deep essays across six regions of a single worldview — the recapture
            pattern, the economics of behavior capture, the two-tier future, leaving
            Earth, programmable biology, and verification as the protector play. Each
            essay reads at a glance, as a map, or in full. The substance leads; the
            craft carries it.
          </p>
          <h2>The quiet part</h2>
          <p>
            The résumé is a whisper, on purpose: {site.credibility.toLowerCase()} No
            logos, no project grid — the ideas are the page.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3 border-t border-line/10 pt-8">
          {site.social.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="me noopener noreferrer"
              className="rounded-full border border-line/25 px-4 py-2 font-sans text-sm text-ink transition-colors hover:border-amber/50 hover:text-amber"
            >
              {s.label} · {s.handle}
            </a>
          ))}
        </div>
      </article>
    </div>
  );
}
