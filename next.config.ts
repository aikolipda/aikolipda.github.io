import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'export',
    basePath: '/lipda_portfolio',
    assetPrefix: '/lipda_portfolio/',
    images: { unoptimized: true },
    trailingSlash: true,
};

export default nextConfig;
