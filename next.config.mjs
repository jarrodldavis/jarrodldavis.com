// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push(
      { test: /\.vcf/, use: "raw-loader" },
      { test: /\.yml/, use: "yaml-loader" },
    );
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.vcf": { loaders: ["raw-loader"] },
        "*.yml": { loaders: ["yaml-loader"] },
      },
    },
  },
};

export default nextConfig;
