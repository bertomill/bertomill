/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: false
  },
  output: 'standalone'
}

module.exports = nextConfig 