import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The whole site is static (no API routes, no next/image, no server-only
  // features) — exporting to plain HTML/CSS/JS means it can be hosted
  // anywhere as static files, including a drag-and-drop Netlify deploy that
  // doesn't consume any build minutes at all.
  output: "export",
};

export default nextConfig;
