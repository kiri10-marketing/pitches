/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  async rewrites() {
    return [
      // Launch ads review board (same pattern as the agent pitch sites).
      { source: "/marketing", destination: "/marketing.html" },
      // Higgsfield images and clips, served from this site so the ad board can draw and export them.
      { source: "/hf/:file", destination: "https://d8j0ntlcm91z4.cloudfront.net/user_3IQWYugObr2b97xnqTXaoi7FtNm/:file" },
    ];
  },
};
