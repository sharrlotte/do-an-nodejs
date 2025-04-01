/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'img.c0m.io',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
