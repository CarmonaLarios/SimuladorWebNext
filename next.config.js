/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['cd.mycon.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mycon.com.br',
        port: '',
        pathname: '/random',
      },
    ],
  },
};
module.exports = nextConfig;
