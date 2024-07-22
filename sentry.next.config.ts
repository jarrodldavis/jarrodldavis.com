import { getSentryRelease, withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import type { Rewrite } from "next/dist/lib/load-custom-routes";

export const reportRoute = "/reporting";

export function reportTunnel(): Rewrite {
  const sentryEnv = process.env.VERCEL_ENV
    ? (`vercel-${process.env.VERCEL_ENV}` as const)
    : process.env.NODE_ENV;

  const reportURL = new URL(process.env.SENTRY_REPORT_URI);
  reportURL.searchParams.set("hsts", "0");
  reportURL.searchParams.set("sentry_environment", sentryEnv);

  const sentryRelease = sentryEnv === "development" ? null : getSentryRelease();
  if (sentryRelease) {
    reportURL.searchParams.set("sentry_release", sentryRelease);
  }

  return {
    destination: reportURL.toString(),
    source: `${reportRoute}(/?)`,
  };
}

export default function withSentry(config: NextConfig) {
  return withSentryConfig(config, {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: !process.env.NEXT_PUBLIC_SENTRY_DEBUG,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    unstable_sentryWebpackPluginOptions: {
      bundleSizeOptimizations: {
        excludeDebugStatements: !process.env.NEXT_PUBLIC_SENTRY_DEBUG,
        excludePerformanceMonitoring: true,
        excludeReplayIframe: true,
        excludeReplayShadowDom: true,
        excludeReplayWorker: true,
      },
    },
  });
}
