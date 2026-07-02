import fs from "node:fs";
import path from "node:path";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * The full-bleed hero band. When public/hero.jpg exists it renders everywhere
 * (with a whisper of the blend so the masthead reads). Until then, the blend
 * band shows on desktop only and the band is cut on mobile so content leads.
 */
export function HeroBand() {
  const hasImage = fs.existsSync(path.join(process.cwd(), "public", "hero.jpg"));

  if (hasImage) {
    return (
      <div className="relative w-full overflow-hidden" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE_PATH}/hero.jpg`}
          alt=""
          className="h-[26vh] min-h-[160px] w-full object-cover sm:h-[34vh]"
        />
        <div className="band-blend absolute inset-0 opacity-30 mix-blend-multiply" />
      </div>
    );
  }

  /* No image, no band. A decorative strip above the content reads as filler;
     the page opens with the masthead rule and the statement. */
  return null;
}
