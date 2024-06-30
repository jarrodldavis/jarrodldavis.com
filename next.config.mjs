// @ts-check

import VcfPngResolverPlugin from "./loaders/resolve-vcf-png.cjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push(
      { test: /\.vcf$/, use: "loaders/vcf.cjs" },
      { test: /\.vcf\.png$/, use: "loaders/vcf.png.cjs" },
      { test: /\.yml$/, use: "loaders/yaml.cjs" },
    );

    config.resolve.plugins.unshift(new VcfPngResolverPlugin());

    return config;
  },
};

export default nextConfig;
