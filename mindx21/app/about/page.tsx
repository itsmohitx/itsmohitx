import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageNav } from "@/components/site/PageNav";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
  alternates: { canonical: "/about" },
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * A short, plain bio built from named, checkable facts. One centered editorial
 * column at the site reading measure; the photo sits as a figure between the
 * name and the text. If public/mohit.jpg is ever removed the column simply
 * closes up without it.
 */
export default function AboutPage() {
  const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", "mohit.jpg"));

  return (
    <div className="mx-auto max-w-wide px-5 py-10 sm:px-8">
      <PageNav crumbs={[{ label: "Home", href: "/" }, { label: "About" }]} backHref="/" />

      <article className="mx-auto max-w-measure">
        <h1 className="type-h1">{site.author}</h1>

        {hasPhoto && (
          <figure className="mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}/mohit.jpg`}
              alt={`${site.author} at the shoreline, watching the waves come in`}
              className="w-full max-w-[26rem]"
              width={460}
              height={460}
            />
            <figcaption className="type-label mt-3">At the shoreline.</figcaption>
          </figure>
        )}

        <div className="reading mt-8">
          <p>{site.description}</p>
          <p>
            The work, plainly. I am co-founder and CEO of{" "}
            <a href="https://glanzaventures.com" target="_blank" rel="noopener noreferrer">
              Glanza Ventures
            </a>{" "}
            and a co-founder of{" "}
            <a href="https://engagenetwork.ai" target="_blank" rel="noopener noreferrer">
              Engage Network
            </a>
            . I bootstrapped a frontier-tech company past a million dollars in revenue in
            under a year, and I have helped run more than a hundred frontier-tech events
            across the globe. Before any of that I played FIDE-rated chess, which is
            probably where the long-horizon habit comes from.
          </p>
          <p>
            The flagship of the writing here is{" "}
            <a href={site.index.href} target="_blank" rel="noopener noreferrer">
              the e/acc Index
            </a>
            : a live, public scoreboard of who accelerates civilization, with every input
            and weight open so you can argue with any score. The essays on this site are
            the reasoning behind it.
          </p>
          <p>
            I answer serious disagreement. Find me on X at{" "}
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
