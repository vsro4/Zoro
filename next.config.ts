import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1"],
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
