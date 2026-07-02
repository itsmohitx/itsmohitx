import type { Metadata } from "next";
import NotFound from "../not-found";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false },
};

/**
 * A real, prerendered /404 page. GitHub Pages serves ONE root 404.html for the
 * whole project domain (the original site's), so the deploy workflow injects a
 * tiny script there that sends /v2-1/* misses here. Inside v2.1 nothing ever
 * falls back to the old design.
 */
export default function NotFoundRoute() {
  return <NotFound />;
}
