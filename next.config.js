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
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://dominio-que-ira-incorporar.com/',
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;

// module.exports = {
//   async headers() {
//     return [
//       {
//         source: '/',
//         headers: [
//           {
//             key: 'X-Frame-Options',
//             value: 'ALLOW-FROM https://dominio-que-ira-incorporar.com/',
//           },
//         ],
//       },
//     ];
//   },
// };

