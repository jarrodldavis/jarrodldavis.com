import { DateRange } from "@/app/common";
import type { ReactNode } from "react";

interface PrimarySectionProps {
  title: string;
  children: ReactNode;
}

export function PrimarySection({ title, children }: PrimarySectionProps) {
  return (
    <section className="mt-4">
      <h2 className="mb-2 border-b-2 border-black text-xl font-bold uppercase">{title}</h2>

      {children}
    </section>
  );
}

interface SecondarySectionProps {
  title: string;
  url?: string | null | undefined;
  subtitle?: ReactNode;
  children: ReactNode;
}

export function SecondarySection({ title, url, subtitle, children }: SecondarySectionProps) {
  return (
    <section>
      <hgroup className="flex justify-between text-nowrap font-bold">
        <h3>
          {url ? (
            <a href={url} target="_blank" rel="noreferrer noopener">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>

        {subtitle}
      </hgroup>

      {children}
    </section>
  );
}

interface TertiarySectionProps {
  title: string;
  startDate: string | null;
  endDate: string | null;
  children: ReactNode;
}

export function TertiarySection({ title, startDate, endDate, children }: TertiarySectionProps) {
  return (
    <section className="mb-4">
      <hgroup className="flex justify-between text-nowrap">
        <h4 className="italic">{title}</h4>
        <DateRange startDate={startDate} endDate={endDate} />
      </hgroup>

      {children}
    </section>
  );
}
