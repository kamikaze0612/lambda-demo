import { relations } from "drizzle-orm";
import { pgTable, serial } from "drizzle-orm/pg-core";

import { companyTranslations } from "./company_translations";
import { timestamps } from "./time_stamps";

export const companies = pgTable("companies", () => ({
  id: serial("id").primaryKey(),
  ...timestamps,
}));

export const companiesRelations = relations(companies, ({ many }) => ({
  translations: many(companyTranslations),
}));
