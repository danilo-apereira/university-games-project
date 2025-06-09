import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "53d6-187-72-95-177.ngrok-free.app",
        port: "80",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
