export const DATE_FORMATTER = new Intl.DateTimeFormat("en-us", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export const LIST_FORMATTER = new Intl.ListFormat("en-us", { type: "unit" });