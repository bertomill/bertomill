/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'avatars.githubusercontent.com',
      'cdn-images-1.medium.com'
    ],
    unoptimized: false
  },
  output: 'standalone'
}

module.exports = nextConfig 