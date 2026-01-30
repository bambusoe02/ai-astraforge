/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@astraforge/ui", "@astraforge/ai-agents"],
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Compression
  compress: true,

  // Headers for caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          // Disable cache for dynamic pages to ensure fresh content
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, max-age=0'
          },
        ],
      },
      {
        source: '/dashboard/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, max-age=0'
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, max-age=0'
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Rewrites for API (only in development if external API is needed)
  async rewrites() {
    // Only use rewrites in development if external API URL is provided
    if (process.env.NODE_ENV === 'development' && process.env.EXTERNAL_API_URL) {
      return [
        {
          source: "/api/:path*",
          destination: `${process.env.EXTERNAL_API_URL}/api/:path*`,
        },
      ];
    }
    return [];
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Tree shaking optimizations
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: false,
    };

    // Reduce bundle size
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Ignore problematic zod helper in @anthropic-ai/sdk
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    // Mark @anthropic-ai/sdk as external for server builds
    if (isServer) {
      config.externals = config.externals || [];
      if (typeof config.externals === 'string') {
        config.externals = [config.externals];
      }
      config.externals.push('@anthropic-ai/sdk');
    }

    return config;
  },

  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
};

module.exports = nextConfig;
