import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageNav } from "@/components/site/PageNav";

export const metadata: Metadata = {
  title: "About",
  description: "Mohit Jain writes about frontier technology, and who it leaves behind.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-wide px-5 py-10 sm:px-8">
      <PageNav crumbs={[{ label: "Mind", href: "/" }, { label: "About" }]} backHref="/" />

      <article className="mx-auto max-w-measure">
        <header className="mb-10">
          <p className="eyebrow">About</p>
        </header>

        <div className="reading text-lg">
          <p>
            I&apos;m Mohit Jain. I think and write about frontier technology, mostly AI, space,
            and biology, and the economics that decide who they actually serve.
          </p>
          <p>
            If I get only one idea, it is this. Every liberating technology gets recaptured into
            concentration, and the work of our generation is to resist that. I am optimistic about
            what we can build and skeptical about who ends up holding it.
          </p>
          <p>
            Before this, I spent close to a decade as an operator. I bootstrapped a company past a
            million dollars in revenue in under a year, helped run more than a hundred events
            bringing frontier tech to India, and learned distribution from the inside. Then I
            stopped, to build and think about what comes next.
          </p>
          <p>
            I played competitive chess, including at the national level, which is probably where the
            long-horizon thinking started. I read cosmology and longevity for fun. Carl Sagan&apos;s
            Pale Blue Dot is the closest thing I have to a scripture.
          </p>
          <p>
            This site is a garden, not a resume. It grows as I think. If you want my read on where
            any of this is going, ask.
          </p>
          <p>
            Find me on X at{" "}
            <a href={site.social[0].href} target="_blank" rel="me noopener noreferrer">
              {site.handle}
            </a>
            .
          </p>
        </div>
      </article>
    </div>
  );
}
