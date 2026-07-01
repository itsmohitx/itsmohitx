/**
 * The one unfakeably human touch: a rough, imperfect underline drawn as a single
 * wobbling stroke (two passes, the way a pen actually doubles back). It is a
 * hand-traced path, deliberately uneven; replace the path with a scan of a real
 * pen stroke any time.
 */
export function HandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 14"
      preserveAspectRatio="none"
      className={`block h-[0.32em] w-full text-accent ${className}`}
      fill="none"
    >
      <path
        d="M3 9.2 C 28 6.4, 47 10.8, 72 8.1 S 121 5.2, 146 8.6 S 196 10.4, 217 6.9"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M6 11.8 C 39 9.6, 68 12.4, 103 10.2 S 168 8.0, 214 10.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}
