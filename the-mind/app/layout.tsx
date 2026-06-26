import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Grain } from "@/components/site/Grain";
import { TopNav } from "@/components/site/TopNav";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.author}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.author }],
  openGraph: {
    title: `${site.name} — ${site.author}`,
    description: site.description,
    type: "website",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image", creator: site.handle },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0F0D0B" },
    { media: "(prefers-color-scheme: light)", color: "#F6F1E8" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SmoothScroll />
          <Grain />
          <TopNav />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
