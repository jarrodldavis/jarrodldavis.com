declare namespace NodeJS {
  interface ProcessEnv {
    readonly CI?: string;
    readonly NEXT_PUBLIC_VERCEL_ENV?: "production" | "preview";
    readonly NEXT_RUNTIME?: string;
    readonly VERCEL_ENV?: "production" | "preview";

    readonly NEXT_PUBLIC_SENTRY_DEBUG: string;
    readonly NEXT_PUBLIC_SENTRY_DSN: string;
    readonly SENTRY_ORG: string;
    readonly SENTRY_PROJECT: string;
    readonly SENTRY_REPORT_URI: string;

    readonly [key: string]: unknown;
  }
}
