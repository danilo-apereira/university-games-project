import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "26.40.35.207",
        port: "8000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
