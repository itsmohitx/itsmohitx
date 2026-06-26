"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { regions, connections, type RegionSlug } from "@/content/regions";

/**
 * The animated regions map. Split out from RegionsMap so Framer Motion is only
 * loaded (lazily) on wide screens - the homepage's initial payload stays light and
 * the SSR'd list shows instantly. Restrained motion only: gentle drift, soft glow,
 * tasteful hover. Honours prefers-reduced-motion (renders static).
 */
export default function MapCanvas() {
  const [hovered, setHovered] = useState<RegionSlug | null>(null);
  const reduce = useReducedMotion();

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line/10"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 42%, rgb(var(--amber) / 0.06), transparent 60%), rgb(var(--surface) / 0.35)",
      }}
      onMouseLeave={() => setHovered(null)}
    >
      {/* Connections - annotated edges, drawn behind the nodes. */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {connections.map((c, i) => {
          const a = regions.find((r) => r.slug === c.a)!;
          const b = regions.find((r) => r.slug === c.b)!;
          const active = hovered === c.a || hovered === c.b;
          const dim = hovered !== null && !active;
          return (
            <line
              key={i}
              x1={a.pos.x}
              y1={a.pos.y}
              x2={b.pos.x}
              y2={b.pos.y}
              stroke="rgb(var(--amber))"
              strokeWidth={active ? 1.4 : 1}
              strokeOpacity={active ? 0.55 : dim ? 0.05 : 0.16}
              vectorEffect="non-scaling-stroke"
              style={{ transition: "stroke-opacity 0.3s ease, stroke-width 0.3s ease" }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {regions.map((r, i) => {
        const accent = r.accent === "amber" ? "var(--amber)" : "var(--oxblood)";
        const active = hovered === r.slug;
        const dim = hovered !== null && !active;
        const dur = 13 + (i % 4) * 2.5;
        const drift = reduce
          ? {}
          : { x: [0, i % 2 === 0 ? 6 : -5, 0], y: [0, i % 3 === 0 ? -6 : 5, 0] };

        return (
          <motion.div
            key={r.slug}
            className="absolute"
            style={{ left: `${r.pos.x}%`, top: `${r.pos.y}%`, translateX: "-50%", translateY: "-50%" }}
            animate={drift}
            transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          >
            <Link
              href={`/regions/${r.slug}`}
              aria-label={`${r.title}. ${r.glance}`}
              onMouseEnter={() => setHovered(r.slug)}
              onFocus={() => setHovered(r.slug)}
              onBlur={() => setHovered(null)}
              className="group relative flex flex-col items-center outline-none"
              style={{ opacity: dim ? 0.5 : 1, transition: "opacity 0.3s ease" }}
            >
              {/* glow */}
              <span
                aria-hidden
                className="pointer-events-none absolute rounded-full blur-xl transition-all duration-500"
                style={{
                  width: `${r.size * (active ? 5.5 : 4.5)}rem`,
                  height: `${r.size * (active ? 5.5 : 4.5)}rem`,
                  background: `radial-gradient(circle, rgb(${accent} / ${active ? 0.4 : 0.22}), transparent 70%)`,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
              {/* disc */}
              <motion.span
                aria-hidden
                className="relative block rounded-full"
                style={{
                  width: `${r.size * 0.95}rem`,
                  height: `${r.size * 0.95}rem`,
                  background: `radial-gradient(circle at 35% 30%, rgb(${accent}), rgb(${accent} / 0.55))`,
                  boxShadow: `0 0 0 1px rgb(${accent} / 0.4), 0 8px 30px -8px rgb(${accent} / 0.5)`,
                }}
                animate={reduce ? {} : { scale: [1, 1.06, 1] }}
                transition={{ duration: 6 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
              />
              {/* label */}
              <span className="pointer-events-none mt-3 whitespace-nowrap text-center">
                <span
                  className="block font-sans text-[0.92rem] font-medium transition-colors"
                  style={{ color: active ? "rgb(var(--ink))" : "rgb(var(--muted))" }}
                >
                  {r.short}
                </span>
              </span>
            </Link>

            {/* hover glance */}
            {active && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="pointer-events-none absolute left-1/2 top-full z-10 mt-9 w-56 -translate-x-1/2 rounded-xl border border-line/15 bg-bg/95 p-3 text-center shadow-pane backdrop-blur"
              >
                <p className="font-serif text-sm leading-snug text-ink/90">{r.glance}</p>
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* quiet hint */}
      <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
        Five regions · click to enter · hover to glimpse
      </p>
    </div>
  );
}
