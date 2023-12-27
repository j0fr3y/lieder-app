/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_STRAPI_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_STRAPI_HOST,
        port: process.env.NEXT_PUBLIC_STRAPI_PORT,
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
