/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true, //remove this if upgraded to NextJS 15
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '145433128.fs1.hubspotusercontent-eu1.net'
      }
    ]
  }
}

export default nextConfig
