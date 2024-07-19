import withVercelToolbar from "@vercel/toolbar/plugins/next";
import type { NextConfig } from "next";
import VcfPngResolverPlugin from "./loaders/resolve-vcf-png";
import type {} from "./reset";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push(
      { test: /\.ttf$/, use: "loaders/ttf.cjs" },
      { test: /\.vcf$/, use: "loaders/vcf.cjs" },
      { test: /\.vcf\.png$/, use: "loaders/vcf.png.cjs" },
      { test: /\.yml$/, use: "loaders/yaml.cjs" },
    );

    config.resolve.plugins.unshift(new VcfPngResolverPlugin());

    return config;
  },
};

export default [process.env.NODE_ENV === "development" && withVercelToolbar()]
  .filter(Boolean)
  .reduceRight((nextConfig, transform) => transform(nextConfig), nextConfig);
