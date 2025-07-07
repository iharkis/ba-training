/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Allow build to complete even with TypeScript errors during development
    ignoreBuildErrors: false,
  },
  eslint: {
    // Allow build to complete even with ESLint errors during development
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig