import { reportRoute } from "@/sentry.next.config";
import type { NextConfig } from "next";
import crypto from "node:crypto";

const isDev = process.env.NODE_ENV === "development";
const isPreviewToolbar = process.env.VERCEL_ENV === "preview" && !!process.env.VERCEL_TOOLBAR_CSP;

export default (async function headers(this: NextConfig) {
  return [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Reporting-Endpoints",
          value: `default="${reportRoute}"`,
        },
        {
          key: "Content-Security-Policy-Report-Only",
          value: contentSecurityPolicy(this.env),
        },
        {
          key: "Cross-Origin-Opener-Policy",
          value: "same-origin",
        },
        {
          key: "Cross-Origin-Embedder-Policy",
          value: isDev || isPreviewToolbar ? "unsafe-none" : "credentialless",
        },
        {
          key: "Cross-Origin-Resource-Policy",
          value: "same-origin",
        },
        {
          key: "Permissions-Policy-Report-Only",
          value: permissionsPolicy(),
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
      ],
    },
  ];
} satisfies NextConfig["headers"]);

function contentSecurityPolicy(env: NextConfig["env"]) {
  type CSPHashAlgorithm = (typeof HASH_ALGORITHMS)[number];

  function hash(algorithm: CSPHashAlgorithm, content: string) {
    return `'${algorithm}-${crypto.hash(algorithm, content, "base64")}'` as const;
  }

  const NONE = "'none'";
  const SELF = "'self'";
  const INLINE = "'unsafe-inline'";
  const HASHES = "'unsafe-hashes'";
  const EVAL = "'unsafe-eval'";

  const BLOB = "blob:";
  const DATA = "data:";

  const NEXT_IMAGE_PLACEHOLDER = hash("sha256", "color:transparent");

  const SENTRY_SPOTLIGHT = "http://localhost:8969/stream";
  const PUSHER = "wss://*.pusher.com";
  const VERCEL_DASHBOARD = "https://vercel.com";
  const VERCEL_LIVE = "https://vercel.live";
  const VERCEL_SCRIPTS = "https://va.vercel-scripts.com";
  const VERCEL_TOOLBAR = env?.["VERCEL_TOOLBAR_SERVER"];

  const HASH_ALGORITHMS = ["sha256", "sha384", "sha512"] as const;
  const INLINE_CONFLICTS = [HASHES, ...["nonce", ...HASH_ALGORITHMS].map((type) => `'${type}-`)];

  const groups: Array<Record<string, Array<string | undefined>> | false> = [
    // Self (Baseline)
    {
      "default-src": [],
      "font-src": [SELF],
      "img-src": [SELF],
      "script-src": [SELF, INLINE],
      "style-src": [SELF, HASHES, NEXT_IMAGE_PLACEHOLDER],
      "form-action": [],
      // TODO: enable on switch from `Content-Security-Policy-Report-Only` to `Content-Security-Policy`
      // "frame-ancestors": [],
    },

    // Self (Dev)
    isDev && {
      "connect-src": [SELF],
      "script-src": [EVAL],
    },

    // Sentry (Baseline)
    {
      "connect-src": [SELF],
      "worker-src": [BLOB],
    },

    // Sentry (Dev)
    isDev && {
      "connect-src": [SENTRY_SPOTLIGHT],
    },

    // Vercel Analytics (Baseline)
    {},

    // Vercel Analytics (Dev)
    isDev && {
      "connect-src": [SELF],
      "script-src": [VERCEL_SCRIPTS],
    },

    // Vercel Speed Insights (Baseline)
    {},

    // Vercel Speed Insights (Dev)
    isDev && {
      "connect-src": [SELF],
      "script-src": [VERCEL_SCRIPTS],
    },

    // Vercel Toolbar (Baseline)
    (isDev || isPreviewToolbar) && {
      "connect-src": [SELF, DATA, VERCEL_LIVE, PUSHER],
      "frame-src": [VERCEL_LIVE],
      "font-src": [VERCEL_LIVE],
      "img-src": [DATA, BLOB, VERCEL_LIVE, VERCEL_DASHBOARD],
      "script-src": [VERCEL_LIVE],
      "style-src": [INLINE, VERCEL_LIVE],
    },

    // Vercel Toolbar (Dev)
    isDev && {
      "connect-src": [VERCEL_TOOLBAR],
    },

    // Reporting
    {
      "report-uri": [reportRoute],
      "report-to": ["default"],
    },
  ];

  const directives: Record<string, string[]> = {};

  for (const group of groups) {
    if (!group) {
      continue;
    }

    for (const directive in group) {
      (directives[directive] ||= []).push(...(group[directive]?.filter(Boolean) ?? []));
    }
  }

  for (const directive in directives) {
    const sources = directives[directive];

    if (!sources) {
      continue;
    } else if (sources.length === 0) {
      sources.push(NONE);
    } else {
      sources.splice(0, sources.length, ...new Set(sources));
    }

    if (sources.includes(INLINE)) {
      directives[directive] = sources.filter(
        (source) => !INLINE_CONFLICTS.some((prefix) => source.startsWith(prefix)),
      );
    }
  }

  return Object.entries(directives)
    .map(([directive, values]) => [directive, ...values].join(" "))
    .join("; ");
}

function permissionsPolicy() {
  const disallowed: string[] = [
    // https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md#standardized-features
    "accelerometer",
    "attribution-reporting",
    "autoplay",
    "bluetooth",
    "browsing-topics",
    "camera",
    "compute-pressure",
    "display-capture",
    "encrypted-media",
    "fullscreen",
    "gamepad",
    "geolocation",
    "gyroscope",
    "hid",
    "identity-credentials-get",
    "idle-detection",
    "local-fonts",
    "magnetometer",
    "microphone",
    "midi",
    "otp-credentials",
    "payment",
    "picture-in-picture",
    "publickey-credentials-create",
    "publickey-credentials-get",
    "screen-wake-lock",
    "serial",
    "storage-access",
    "usb",
    "window-management",
    "xr-spatial-tracking",

    // https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md#standardized-features
    "keyboard-map",
    "sync-xhr",

    // https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md#proposed-features
    "clipboard-read",
    "clipboard-write",
    "gamepad",

    // https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md#experimental-features
    "unload",
  ];

  const allowed: Array<string | [string, string]> = [];

  return [
    ...disallowed.map((directive) => `${directive}=()`),
    ...allowed.map((rule) => {
      const [directive, origin] = Array.isArray(rule) ? rule : [rule, "self"];
      return `${directive}=${origin}`;
    }),
  ].join(", ");
}
