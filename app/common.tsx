import { DATE_FORMATTER, LIST_FORMATTER } from "@/app/utils";
import type { ReactNode } from "react";
import Markdown, { type Components as MarkdownComponents } from "react-markdown";

interface DateRangeProps {
  startDate: string | null;
  endDate: string | null;
}

export function DateRange({ startDate, endDate }: DateRangeProps) {
  const start = startDate ? new Date(startDate) : null;

  if (!start?.valueOf()) {
    throw new Error("invalid start date");
  }

  const end = endDate
    ? endDate.toLowerCase() === "present"
      ? "Present"
      : new Date(endDate)
    : null;

  if (!end?.valueOf()) {
    throw new Error("invalid end date");
  }

  return (
    <p className="text-nowrap font-mono tracking-tight">
      <time dateTime={start.toISOString().split("T")[0]}>{DATE_FORMATTER.format(start)}</time>
      <span> &ndash; </span>
      {end instanceof Date ? (
        <time dateTime={end.toISOString().split("T")[0]}>
          {end instanceof Date ? DATE_FORMATTER.format(end) : null}
        </time>
      ) : (
        end
      )}
    </p>
  );
}

interface ListProps {
  items: ReactNode[];
}

// Workaround for discrepancy in how Typst and Markdown indicate strong and emphasis runs.
const MARKDOWN_COMPONENTS: MarkdownComponents = { em: "strong" };

export function List(props: ListProps) {
  const items = props.items.filter((item) => item);

  if (!items.length) {
    return null;
  }

  return (
    <ul className="ml-4 list-outside list-disc text-pretty">
      {items.map((item, index) => (
        <li key={index} className="mb-1">
          {typeof item === "string" ? (
            <Markdown components={MARKDOWN_COMPONENTS}>{item}</Markdown>
          ) : (
            item
          )}
        </li>
      ))}
    </ul>
  );
}

export function sublist(title: string, items: string[] | null | undefined) {
  return (
    items?.length && (
      <>
        <span className="font-bold">{title}:</span> {LIST_FORMATTER.format(items)}
      </>
    )
  );
}
