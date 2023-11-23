/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'd2qiddtpnkk837.cloudfront.net',
          pathname: '**',
        },
      ],
    },
}

module.exports = nextConfig
