import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devrellab.com"),
  title: "Mohit Jain — Blockchain & Web3 Builder",
  description:
    "Mohit Jain — Blockchain Operation Lead, Web3 community builder and DevRel from Indore, India. Building a more decentralized world, one block at a time.",
  keywords: [
    "Mohit Jain",
    "Web3",
    "Blockchain",
    "DevRel",
    "Quillhash",
    "Portfolio",
  ],
  authors: [{ name: "Mohit Jain" }],
  openGraph: {
    title: "Mohit Jain — Blockchain & Web3 Builder",
    description:
      "Blockchain Operation Lead, Web3 community builder and DevRel. Building a more decentralized world.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full`}
    >
      <body className="grain min-h-full">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
