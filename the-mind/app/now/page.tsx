import type { Metadata } from "next";
import { PageNav } from "@/components/site/PageNav";

export const metadata: Metadata = {
  title: "Now",
  description: "What Mohit is focused on right now.",
};

// A /now page (nownownow.com style). Edit these as life changes.
const now = [
  {
    label: "Building",
    body: "The e/acc Index — an index ranking how much companies actually accelerate civilization. Quiet for now; it'll get a real home here when it's ready.",
  },
  {
    label: "Writing",
    body: "Working through the six regions one essay at a time, argued the way I actually think them — usually backward from a concrete future scene.",
  },
  {
    label: "Reading",
    body: "Closer to the primary sources on longevity and verification than to the commentary around them.",
  },
  {
    label: "Thinking about",
    body: "How to design the exception to the recapture pattern — the thing that stays free because concentration around it is structurally useless.",
  },
];

export default function NowPage() {
  return (
    <div className="mx-auto max-w-wide px-5 py-10 sm:px-8">
      <PageNav crumbs={[{ label: "Mind", href: "/" }, { label: "Now" }]} backHref="/" />

      <article className="mx-auto max-w-measure">
        <header className="mb-12">
          <p className="eyebrow">Now</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            What I&apos;m focused on
          </h1>
          <p className="mt-5 font-serif text-xl font-light leading-relaxed text-muted">
            A snapshot of the present, not an archive. The kind of page I wish more
            people kept.
          </p>
        </header>

        <dl className="space-y-8">
          {now.map((item) => (
            <div key={item.label} className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <dt className="eyebrow pt-1 text-amber/80">{item.label}</dt>
              <dd className="font-serif text-lg leading-relaxed text-ink/90">{item.body}</dd>
            </div>
          ))}
        </dl>
      </article>
    </div>
  );
}
