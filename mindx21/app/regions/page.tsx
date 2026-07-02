import type { Metadata } from "next";
import { RegionsMap } from "@/components/map/RegionsMap";
import { PageNav } from "@/components/site/PageNav";

export const metadata: Metadata = {
  title: "Regions",
  description: "Five regions of one worldview: the territory the essays cover, and how it connects.",
  alternates: { canonical: "/regions" },
};

export default function RegionsIndex() {
  return (
    <div className="mx-auto max-w-wide px-5 py-10 sm:px-8">
      <PageNav crumbs={[{ label: "Home", href: "/" }, { label: "Regions" }]} />

      <header className="mb-10 max-w-2xl">
        <h1 className="type-h1">Regions</h1>
        <p className="reading mt-5 text-lg">
          Five regions of one worldview, with every essay placed on the map as a landmark.
          The edges carry the argument: name where two regions touch and you usually find
          the essay.
        </p>
      </header>

      <RegionsMap />
    </div>
  );
}
