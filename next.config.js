const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'avatars.githubusercontent.com',
      'cdn-images-1.medium.com',
      'your-domain.com'
    ],
    unoptimized: false
  },
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    speedInsights: {
      enabled: true,
    },
  },
}

module.exports = withMDX(nextConfig) 