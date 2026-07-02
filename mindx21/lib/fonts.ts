/**
 * Two faces only, self-hosted via next/font. Serif plus mono, no generic sans.
 *  · Fraunces (variable, with optical sizing) carries display and body.
 *  · Fragment Mono carries the nameplate, labels, metadata, and contents numbers.
 * Fraunces is the LCP face, so it alone is preloaded.
 */
import { Fraunces, Fragment_Mono } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  variable: "--font-fraunces",
});

export const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--font-fragment-mono",
});

export const fontVariables = `${fraunces.variable} ${fragmentMono.variable}`;
