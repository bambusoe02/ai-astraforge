/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@astraforge/ui", "@astraforge/ai-agents"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
