/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    // Allow build to complete even with TypeScript errors during development
    ignoreBuildErrors: false,
  },
  eslint: {
    // Allow build to complete even with ESLint errors during development
    ignoreDuringBuilds: false,
  },
  experimental: {
    // Allow static export to continue despite useSearchParams warnings
    missingSuspenseWithCSRBailout: false,
  },
}

module.exports = nextConfig