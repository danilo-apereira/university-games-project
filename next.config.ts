import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "4047-187-72-95-177.ngrok-free.app",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
