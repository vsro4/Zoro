import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.sell.app",
        pathname: "/store/**",
      },
    ],
  },
};

export default nextConfig;
