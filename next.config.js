/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    unoptimized: false
  },
  // Ensure proper handling of static assets
  output: 'standalone'
}

module.exports = nextConfig 