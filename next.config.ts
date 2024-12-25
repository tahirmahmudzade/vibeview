import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co", pathname: "/image/**" },
      { protocol: "https", hostname: "mosaic.scdn.co", pathname: "**" },
      {
        protocol: "https",
        hostname: "image-cdn-fa.spotifycdn.com",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "image-cdn-ak.spotifycdn.com",
        pathname: "/image/**",
      },
    ],
  },
};

export default nextConfig;
