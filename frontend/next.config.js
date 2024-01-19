/** @type {import('next').NextConfig} */

const { withPlausibleProxy } = require("next-plausible");

const nextConfig = withPlausibleProxy({
  customDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
})({
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
});

module.exports = nextConfig;
