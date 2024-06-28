import resumeData from "@/app/resume-data";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

const TiTLE_FORMATTER = new Intl.ListFormat("en-us", { type: "conjunction" });
const { name, titles } = resumeData.personal;

const description = (
  <>
    Hey! I’m Jarrod Davis, a full stack developer and software engineer who enjoys building
    delightful experiences and helpful tools. I’ve worked with numerous languages, frameworks, and
    libraries, with a significant focus on command-line utilities and web applications (frontend and
    backend).
  </>
).props.children as string;

export const metadata: Metadata = {
  title: titles ? `${name} | ${TiTLE_FORMATTER.format(titles)}` : name,
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-slate-200 dark:bg-zinc-900 dark:text-stone-300">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
