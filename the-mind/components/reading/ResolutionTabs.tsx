"use client";

import { useState } from "react";
import type { OutlineItem } from "@/lib/mdx";

type Depth = "glance" | "map" | "deep";

/**
 * Multi-resolution reading via progressive disclosure (NOT literal zoom).
 *  · Glance → one line, anyone gets it in seconds
 *  · Map    → the structural outline; the reader can jump in anywhere
 *  · Deep   → the full essay (the default; reading is sacred)
 *
 * Deep is the default so a first-time visitor simply *reads*. The control is an
 * affordance for those who want to skim or orient first - never a tax.
 */
export function ResolutionTabs({
  glance,
  summary,
  outline,
  children,
}: {
  glance: string;
  summary: string;
  outline: OutlineItem[];
  children: React.ReactNode;
}) {
  const [depth, setDepth] = useState<Depth>("deep");

  const jumpTo = (id: string) => {
    setDepth("deep");
    // Wait for the deep view to mount, then scroll the heading into view.
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }, 30);
  };

  const options: { key: Depth; label: string; hint: string }[] = [
    { key: "glance", label: "Glance", hint: "one line" },
    { key: "map", label: "Map", hint: "the structure" },
    { key: "deep", label: "Deep", hint: "the full read" },
  ];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Reading depth"
        className="mb-10 inline-flex rounded-full border border-line/20 bg-surface/50 p-1"
      >
        {options.map((o) => {
          const active = depth === o.key;
          return (
            <button
              key={o.key}
              role="tab"
              aria-selected={active}
              onClick={() => setDepth(o.key)}
              title={o.hint}
              className={`rounded-full px-3.5 py-1.5 font-sans text-[0.82rem] transition-colors sm:px-4 ${
                active ? "bg-amber/15 text-amber" : "text-muted hover:text-ink"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>

      {depth === "glance" && (
        <div className="animate-fade-up">
          <p className="eyebrow mb-4">The glance</p>
          <p className="max-w-measure font-serif text-2xl leading-snug text-ink text-balance sm:text-3xl">
            {glance}
          </p>
          <button
            onClick={() => setDepth("deep")}
            className="mt-8 font-sans text-sm text-amber underline-offset-4 hover:underline"
          >
            Read the full essay →
          </button>
        </div>
      )}

      {depth === "map" && (
        <div className="animate-fade-up">
          <p className="eyebrow mb-4">The map</p>
          {summary && (
            <p className="mb-8 max-w-measure font-serif text-xl leading-relaxed text-ink/90">
              {summary}
            </p>
          )}
          {outline.length > 0 ? (
            <ol className="max-w-measure space-y-1 border-l border-line/20">
              {outline.map((item, i) => (
                <li key={item.id} style={{ paddingLeft: item.depth === 3 ? "1.75rem" : "0" }}>
                  <button
                    onClick={() => jumpTo(item.id)}
                    className="group flex w-full items-baseline gap-3 py-2 pl-5 text-left"
                  >
                    <span className="font-mono text-xs text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-serif text-ink/85 transition-colors group-hover:text-amber ${
                        item.depth === 3 ? "text-base" : "text-lg"
                      }`}
                    >
                      {item.text}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-muted">This essay reads as one continuous movement. Open the deep read.</p>
          )}
          <button
            onClick={() => setDepth("deep")}
            className="mt-8 font-sans text-sm text-amber underline-offset-4 hover:underline"
          >
            Read the full essay →
          </button>
        </div>
      )}

      {depth === "deep" && <div className="animate-fade-up">{children}</div>}
    </div>
  );
}
