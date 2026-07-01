import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageNav } from "@/components/site/PageNav";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
  alternates: { canonical: "/about" },
};

/**
 * Short on purpose. No photo, no résumé paragraph, no credentials list.
 * The e/acc Index is the credential.
 */
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-wide px-5 py-10 sm:px-8">
      <PageNav crumbs={[{ label: "Home", href: "/" }, { label: "About" }]} backHref="/" />

      <article className="mx-auto max-w-measure">
        <p className="label">About</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {site.author}
        </h1>

        <div className="reading mt-8 text-lg">
          <p>{site.description}</p>
          <p>
            The clearest way to see how I think is my flagship work,{" "}
            <a href={site.index.href} target="_blank" rel="noopener noreferrer">
              the e/acc Index
            </a>
            : a live, public scoreboard of who accelerates civilization. Every input and every
            weight is open, so you can argue with any score. The essays here are the reasoning
            behind it.
          </p>
          <p>
            I read essays back to their sources and I answer serious disagreement. Find me on X
            at{" "}
            <a href={site.x.href} target="_blank" rel="me noopener noreferrer">
              {site.handle}
            </a>
            .
          </p>
        </div>
      </article>
    </div>
  );
}
