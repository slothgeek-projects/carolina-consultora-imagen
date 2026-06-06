import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'officia.app',
      },
      {
        protocol: 'https',
        hostname: '07.officia.app',
      },
      {
        protocol: 'https',
        hostname: 'my.officia.app',
      },
    ],
  },
};

export default nextConfig;
