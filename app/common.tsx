import { DATE_FORMATTER } from "@/app/utils";

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
    <p>
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
