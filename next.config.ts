import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: { unoptimized: true },
  reactStrictMode: true,
  turbopack: { root: __dirname },
};

export default nextConfig;
