import { getSentryRelease, withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import type { Rewrite } from "next/dist/lib/load-custom-routes";

export const reportRoute = "/reporting";

export function reportTunnel(): Rewrite | null {
  const sentryEnv = process.env.VERCEL_ENV
    ? (`vercel-${process.env.VERCEL_ENV}` as const)
    : process.env.NODE_ENV;

  const reportURI = process.env.SENTRY_REPORT_URI;
  if (!reportURI) {
    return null;
  }

  const reportURL = new URL(reportURI);
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

// https://github.com/getsentry/spotlight/issues/275
// https://github.com/getsentry/spotlight/blob/%40spotlightjs/spotlight%402.1.0/packages/overlay/src/integrations/sentry/data/sentryDataCache.ts#L298
// https://github.com/getsentry/spotlight/blob/%40spotlightjs/spotlight%402.1.0/packages/overlay/src/constants.ts#L9
export function spotlightContextLinesShim(): Rewrite | null {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return {
    destination: "http://localhost:8969/health",
    source: "/@spotlight/contextlines",
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
