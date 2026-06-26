/**
 * Self-hosted fonts via next/font — zero layout shift, no network calls to Google.
 *  · Newsreader      → the editorial serif for reading (with italics)
 *  · Space Grotesk   → the clean grotesk for UI chrome
 *  · Geist Mono      → metadata, eyebrows, labels
 */
import { Newsreader, Space_Grotesk } from "next/font/google";
import { GeistMono } from "geist/font/mono";

export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const geistMono = GeistMono;

export const fontVariables = `${newsreader.variable} ${spaceGrotesk.variable} ${geistMono.variable}`;
