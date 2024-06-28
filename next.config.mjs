// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push(
      { test: /\.vcf/, use: "loaders/vcf.cjs" },
      { test: /\.yml/, use: "loaders/yaml.cjs" },
    );
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.vcf": { loaders: ["loaders/vcf.cjs"] },
        "*.yml": { loaders: ["loaders/yaml.cjs"] },
      },
    },
  },
};

export default nextConfig;
