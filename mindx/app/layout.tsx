import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import { Grain } from "@/components/site/Grain";
import { Masthead } from "@/components/site/Masthead";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.author, url: site.x.href }],
  alternates: { canonical: "./" },
  openGraph: {
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    type: "website",
    siteName: site.name,
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    creator: site.handle,
    images: ["/og/default.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0E12" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.author,
  alternateName: site.name,
  url: site.url,
  sameAs: [site.x.href, site.index.href],
  description: site.description,
  knowsAbout: ["artificial intelligence", "space", "biology", "technology and society"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Grain />
          <Masthead />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
