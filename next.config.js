/**
 * @type {import('next').NextConfig}
 * module.exports = {
  images: {
    domains: ['courses-top.ru'],
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
 */
const nextConfig = {
  // images: {
  //   domains: ['courses-top.ru'],
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}
/* eslint-env node */
module.exports = nextConfig
