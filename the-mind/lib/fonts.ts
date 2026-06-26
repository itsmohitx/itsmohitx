/**
 * Self-hosted fonts via next/font - zero layout shift, no network calls to Google.
 *  · Newsreader      → the editorial serif for reading (with italics)
 *  · Space Grotesk   → the clean grotesk for UI chrome
 *  · Geist Mono      → metadata, eyebrows, labels
 */
import { Newsreader, Space_Grotesk } from "next/font/google";
import { GeistMono } from "geist/font/mono";

// Newsreader carries the hero headline (the LCP element) and the reading body, so
// it is the one font we preload. Space Grotesk and Geist Mono are deferred
// (preload: false) so they do not compete for bandwidth with the LCP font.
export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
  preload: true,
  variable: "--font-newsreader",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-space-grotesk",
});

export const geistMono = GeistMono;

export const fontVariables = `${newsreader.variable} ${spaceGrotesk.variable} ${geistMono.variable}`;
