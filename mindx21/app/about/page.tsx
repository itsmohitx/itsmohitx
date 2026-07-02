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
 * A short, plain bio built from named, checkable facts. The photo renders from
 * public/mohit.jpg the moment the file exists; until then the layout holds
 * without it.
 */
export default function AboutPage() {
  const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", "mohit.jpg"));

  return (
    <div className="mx-auto max-w-wide px-5 py-10 sm:px-8">
      <PageNav crumbs={[{ label: "Home", href: "/" }, { label: "About" }]} backHref="/" />

      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,22rem)_1fr]">
        {hasPhoto && (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}/mohit.jpg`}
              alt={`${site.author}, photographed indoors, wearing glasses`}
              className="w-full max-w-sm"
              width={880}
              height={1100}
            />
            <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink3">
              {site.author}
            </p>
          </div>
        )}

        <article className="max-w-measure">
          <p className="label">About</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {site.author}
          </h1>

          <div className="reading mt-8 text-lg">
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
    </div>
  );
}
