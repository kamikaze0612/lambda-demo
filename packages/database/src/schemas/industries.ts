import { relations } from "drizzle-orm";
import { pgTable, serial } from "drizzle-orm/pg-core";

import { companiesToIndustries } from "./companies_to_industries";
import { industryTranslations } from "./industry_translations";
import { timestamps } from "./time_stamps";

export const industries = pgTable("industries", () => ({
  id: serial("id").primaryKey(),
  ...timestamps,
}));

export const industriesRelations = relations(industries, ({ many }) => ({
  translations: many(industryTranslations),
  companyToIndustries: many(companiesToIndustries),
}));
