import { getAllEssays } from "@/lib/essays";
import type { RegionSlug } from "@/content/regions";
import MapCanvas, { type Landmark } from "./MapCanvas";
import { RegionsList } from "./RegionsList";

/**
 * Server component: both presentations are in the first-paint HTML and CSS
 * picks one per breakpoint, so nothing flashes empty and no JS is needed to
 * see the map. Wide screens get the map with essay landmarks; small screens
 * get the row list, which is the full equivalent.
 */

/** Hand-placed landmark positions (percent of the field), one per essay. */
const LANDMARK_POS: Record<string, { x: number; y: number }> = {
  "an-optimists-note": { x: 42, y: 30 },
  "what-accelerates-a-civilization": { x: 61, y: 55 },
  "the-optimists-bet": { x: 38, y: 58 },
  "the-recapture-pattern": { x: 14, y: 40 },
  "the-two-tier-future": { x: 88, y: 45 },
  "the-assistant-you-trust": { x: 66, y: 22 },
  "the-case-for-leaving-earth": { x: 33, y: 86 },
  "the-longevity-imperative": { x: 64, y: 82 },
};

export function RegionsMap() {
  const landmarks: Landmark[] = getAllEssays().map((e) => ({
    slug: e.slug,
    title: e.title,
    region: e.region as RegionSlug,
    pos: LANDMARK_POS[e.slug] ?? { x: 50, y: 90 },
  }));

  return (
    <div>
      <div className="hidden md:block">
        <MapCanvas landmarks={landmarks} />
      </div>
      <div className="md:hidden">
        <RegionsList />
      </div>
    </div>
  );
}
