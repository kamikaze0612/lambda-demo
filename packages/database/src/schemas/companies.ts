import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, text, boolean } from "drizzle-orm/pg-core";

import { companiesToIndustries } from "./companies_to_industries";
import { companyTranslations } from "./company_translations";
import { positions } from "./positions";
import { timestamps } from "./time_stamps";

export const companies = pgTable("companies", () => ({
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phoneNumber: text("phone_number"),
  websiteUrl: varchar("website_url", { length: 255 }),
  isFeatured: boolean("is_featured").default(false),
  ...timestamps,
}));

export const companiesRelations = relations(companies, ({ many }) => ({
  translations: many(companyTranslations),
  positions: many(positions),
  companyToIndustries: many(companiesToIndustries),
}));
