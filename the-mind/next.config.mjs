/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Essays are authored as MDX-flavoured Markdown and compiled with a remark/rehype
  // pipeline (see lib/mdx.ts), so we don't need the @next/mdx loader. Keeping the
  // architecture ready to swap in full MDX-with-React components for Phase 2 flagships.
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
