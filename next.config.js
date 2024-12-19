// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  async headers() {
    return [
      {
        // Auth routes - complete no-cache headers
        source: '/auth/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, max-age=0, must-revalidate'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          }
        ]
      },
      {
        // API routes
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, max-age=0, must-revalidate'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          }
        ]
      },
      {
        // Dashboard routes
        source: '/dashboard/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, max-age=0, must-revalidate'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          }
        ]
      },
      {
        // Default for other routes (excluding auth, api, and dashboard)
        source: '/:path((?!auth|api|dashboard).*)*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=60'
          }
        ]
      }
    ];
  },

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true
      },
      {
        source: '/snake',
        destination: '/misc/snake',
        permanent: true
      },
      {
        source: '/dashboard',
        destination: '/dashboard/servers',
        permanent: false
      },
      {
        source: '/login',
        destination: '/auth/login',
        permanent: false
      }
    ];
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/sitemap.xml',
          destination: '/api/sitemap'
        }
      ]
    };
  },

  images: {
    domains: ['cdn.discordapp.com', 'ui-avatars.com'],
    formats: ['image/webp'],
  },

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    return config;
  },
  
  poweredByHeader: false,
  
  compress: true,
  
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  }
};

module.exports = nextConfig;
