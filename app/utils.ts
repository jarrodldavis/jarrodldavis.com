import type { LanguageData } from "@/app/types";
import { Marked } from "marked";

export const DATE_FORMATTER = new Intl.DateTimeFormat("en-us", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export const LIST_FORMATTER = new Intl.ListFormat("en-us", { type: "unit" });

export function formatLanguage({ language, fluency }: LanguageData) {
  return `${language} (${fluency})`;
}

const MARKED = new Marked({
  useNewRenderer: true,
  renderer: {
    // Don't render HTML
    em({ tokens }) {
      return this.parser.parseInline(tokens);
    },
  },
});

export function stripMarkdown(markdown: string) {
  return MARKED.parseInline(markdown);
}
