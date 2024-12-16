// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  async headers() {
    return [
      {
        // Auth routes - no caching
        source: '/auth/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate'
          }
        ]
      },
      {
        // API routes - no caching
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate'
          }
        ]
      },
      {
        // Dashboard routes - no caching
        source: '/dashboard/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate'
          }
        ]
      },
      {
        // Default for other routes
        source: '/:path*',
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
}

module.exports = nextConfig
