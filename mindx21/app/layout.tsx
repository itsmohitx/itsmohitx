import type { Metadata } from "next";
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.author,
  alternateName: site.name,
  url: site.url,
  sameAs: [site.x.href, site.index.href, "https://glanzaventures.com", "https://engagenetwork.ai"],
  description: site.description,
  jobTitle: "Co-founder and CEO, Glanza Ventures",
  knowsAbout: ["artificial intelligence", "space", "biology", "technology and society"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* theme-color follows the ACTIVE site theme (not the OS), so dark mode
            never flashes white. The pre-paint script sets both together; the
            toggle updates them together. */}
        <meta name="theme-color" content="#0A0E15" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t="dark";document.documentElement.setAttribute("data-theme",t);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"#0A0E15":"#FFFFFF");}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`,
          }}
        />
      </head>
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
