/**
 * Three faces, self-hosted via next/font, each with one job.
 *  · Source Serif 4 (variable) is the reading face: body, headings, deks, labels.
 *  · Fraunces appears once, on the home hero line only.
 *  · Fragment Mono is navigation chrome only: top nav and breadcrumb.
 * Source Serif is the LCP face, so it alone is preloaded.
 */
import { Fraunces, Fragment_Mono, Source_Serif_4 } from "next/font/google";

export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  variable: "--font-source-serif",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
  preload: false,
  variable: "--font-fraunces",
});

export const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--font-fragment-mono",
});

export const fontVariables = `${sourceSerif.variable} ${fraunces.variable} ${fragmentMono.variable}`;
