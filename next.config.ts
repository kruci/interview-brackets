import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => [{ source: "/", destination: "/people" }],
};

export default nextConfig;
