/**
 * Static export, base-path aware. Builds to ./out as fully static HTML/JSON/CSS so
 * it can be served from a domain root or a GitHub Pages project subpath with no
 * server. Set NEXT_PUBLIC_BASE_PATH (e.g. /itsmohitx) and NEXT_PUBLIC_SITE_URL at
 * build time; both default to root for local builds.
 *
 * @type {import('next').NextConfig}
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath: basePath || undefined,
  reactStrictMode: true,
  trailingSlash: false,
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
