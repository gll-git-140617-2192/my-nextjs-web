import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! 警告：仅用于排查。这会让 Vercel 忽略类型错误直接发布
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
