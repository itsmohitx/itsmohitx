"use client";

/**
 * Infinite horizontal marquee. Pure CSS-driven via a duplicated track,
 * so it stays smooth and cheap. Used for the brutalist ticker strips.
 */
export default function Marquee({
  items,
  className = "",
  reverse = false,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
}) {
  const track = [...items, ...items];
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div
        className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8"
        style={{
          animation: `marquee 28s linear infinite${
            reverse ? " reverse" : ""
          }`,
        }}
      >
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            {item}
            <span aria-hidden className="text-accent-2">
              ✺
            </span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
