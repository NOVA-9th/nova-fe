import type { NextConfig } from 'next';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiHostname = apiBaseUrl ? new URL(apiBaseUrl).hostname : 'nova-api.snowfrost.kr';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: apiHostname,
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: apiHostname,
        pathname: '/**',
      },
    ],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
