import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "187.72.95.177",
        port: "8585",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
