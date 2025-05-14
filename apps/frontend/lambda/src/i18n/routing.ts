import { defineRouting } from "next-intl/routing";

export const locales = ["en", "mn"] as const;
export const defaultLocale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
});
