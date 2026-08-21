import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/projects', destination: '/#projects', permanent: true },
      { source: '/tech-stack', destination: '/#about', permanent: true },
    ];
  },
};

export default nextConfig;
