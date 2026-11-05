import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: { remotePatterns: [new URL("https://d8j0ntlcm91z4.cloudfront.net/user_3IQWYugObr2b97xnqTXaoi7FtNm/**")] },
  async rewrites() {
    return [
      { source: "/marketing", destination: "/marketing.html" },
    ];
  },
  /* config options here */
};

export default nextConfig;
