import fs from "node:fs";
import path from "node:path";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * The full-bleed hero band, edge to edge, no border, no radius, never inside a
 * container. When public/hero.jpg exists it is the band (with a whisper of the
 * two-color blend over it so the masthead reads); until then the band is the
 * blend itself plus grain. Swapping the real image in requires zero code changes.
 * This blend is the only gradient on the site.
 */
export function HeroBand() {
  const hasImage = fs.existsSync(path.join(process.cwd(), "public", "hero.jpg"));

  return (
    <div className="relative w-full overflow-hidden" aria-hidden>
      {hasImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE_PATH}/hero.jpg`}
            alt=""
            className="h-[38vh] min-h-[240px] w-full object-cover sm:h-[46vh]"
          />
          <div className="band-blend absolute inset-0 opacity-30 mix-blend-multiply" />
        </>
      ) : (
        <div className="band-blend h-[30vh] min-h-[200px] w-full sm:h-[38vh]" />
      )}
    </div>
  );
}
