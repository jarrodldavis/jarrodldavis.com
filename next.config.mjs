// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({ test: /\.yml/, use: "yaml-loader" });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.yml": { loaders: ["yaml-loader"] },
      },
    },
  },
};

export default nextConfig;
