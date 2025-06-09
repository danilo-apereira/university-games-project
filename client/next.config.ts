import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.1.0.105",
        port: "8000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
