import { description } from "@/app/intro";
import resumeData from "@/app/resume-data";
import { TITLE_FORMATTER } from "@/app/utils";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import assert from "node:assert/strict";
import type { ReactNode } from "react";
import "./globals.css";

const { name, titles } = resumeData.personal;
assert.ok(titles, "expected titles to be defined");
const formattedTitles = TITLE_FORMATTER.format(titles);

export const metadata: Metadata = {
  title: `${name} | ${formattedTitles}`,
  description,
  metadataBase: new URL("https://jarrodldavis.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: name,
    description: formattedTitles,
    siteName: "jarrodldavis.com",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: name,
    description: formattedTitles,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body
        className="bg-slate-200 dark:bg-zinc-900 dark:text-stone-300"
        style={
          // Prevent hydration error when Sentry Spotlight is enabled
          process.env.NODE_ENV === "development" ? { overflow: "auto" } : undefined
        }
      >
        {children}
        <SpeedInsights />
        <Analytics />
        {process.env.NODE_ENV === "development" && <VercelToolbar />}
      </body>
    </html>
  );
}
