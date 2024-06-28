import { DateRange } from "@/app/common";
import type { ReactNode } from "react";

interface PrimarySectionProps {
  title: string;
  children: ReactNode;
}

export function PrimarySection({ title, children }: PrimarySectionProps) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 border-b-2 border-black text-center text-xl font-bold uppercase sm:text-start dark:border-stone-300">
        {title}
      </h2>

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
    <section className="mb-6">
      <hgroup className="flex flex-col gap-1 text-center sm:flex-row sm:justify-between sm:text-start">
        <h3 className="font-bold">
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
    <section className="mb-4 mt-1">
      <hgroup className="mb-2 flex flex-col gap-1 text-center sm:mb-1 sm:flex-row sm:justify-between sm:text-start">
        <h4 className="text-balance italic sm:max-w-sm md:max-w-md min-[850px]:max-w-xl">
          {title}
        </h4>
        <DateRange startDate={startDate} endDate={endDate} />
      </hgroup>

      {children}
    </section>
  );
}
