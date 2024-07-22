import withVercelToolbar from "@vercel/toolbar/plugins/next";
import type { NextConfig } from "next";
import headers from "./headers.config";
import VcfPngResolverPlugin from "./loaders/resolve-vcf-png";
import type {} from "./reset";
import withSentry, { reportTunnel } from "./sentry.next.config";

const nextConfig: NextConfig = {
  async rewrites() {
    return [reportTunnel()];
  },
  webpack: (config) => {
    config.module.rules.push(
      { test: /\.ttf$/, use: "loaders/ttf.cjs" },
      { test: /\.vcf$/, use: "loaders/vcf.cjs" },
      { test: /\.vcf\.png$/, use: "loaders/vcf.png.cjs" },
      { test: /\.yml$/, use: "loaders/yaml.cjs" },
    );

    config.resolve.plugins.unshift(new VcfPngResolverPlugin());

    config.resolve.alias ??= {};

    if (process.env.NODE_ENV !== "development") {
      config.resolve.alias["@spotlightjs/spotlight"] = false;
      config.resolve.alias["@vercel/toolbar"] = false;
    }

    return config;
  },
  headers,
};

export default [withSentry, process.env.NODE_ENV === "development" && withVercelToolbar()]
  .filter(Boolean)
  .reduceRight((nextConfig, transform) => transform(nextConfig), nextConfig);
