/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/tnf',
  trailingSlash: true,
}

module.exports = nextConfig
