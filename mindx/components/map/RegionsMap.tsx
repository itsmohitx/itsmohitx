"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { RegionsList } from "./RegionsList";

/**
 * Server render, mobile, touch, and no-JS all get the row list, which is the
 * full equivalent. Wide screens lazily swap in the animated map when it nears
 * the viewport.
 */
const MapCanvas = dynamic(() => import("./MapCanvas"), {
  ssr: false,
  loading: () => <div className="aspect-[16/10] w-full animate-pulse border-y border-line/[.16]" />,
});

export function RegionsMap() {
  const [isWide, setIsWide] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (hover: hover)");
    const update = () => setIsWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "250px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{isWide && inView ? <MapCanvas /> : <RegionsList />}</div>;
}
