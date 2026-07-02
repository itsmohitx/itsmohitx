/**
 * Static export, base-path aware. The preview lives under /itsmohitx/v2 on GitHub
 * Pages; moving to a root domain later is just building with an empty
 * NEXT_PUBLIC_BASE_PATH and the real NEXT_PUBLIC_SITE_URL. Internal links use
 * next/link, which applies basePath automatically, so links work on any domain.
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
