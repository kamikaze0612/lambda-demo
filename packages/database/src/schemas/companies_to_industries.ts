import { relations } from "drizzle-orm";
import { pgTable, integer } from "drizzle-orm/pg-core";

import { companies } from "./companies";
import { industries } from "./industries";
import { timestamps } from "./time_stamps";

export const companiesToIndustries = pgTable("companies_to_industries", {
  companyId: integer("company_id").references(() => companies.id, {
    onDelete: "cascade",
  }),
  industryId: integer("industry_id").references(() => industries.id, {
    onDelete: "cascade",
  }),
  ...timestamps,
});

export const companiesToIndustriesRelations = relations(
  companiesToIndustries,
  ({ one }) => ({
    company: one(companies, {
      fields: [companiesToIndustries.companyId],
      references: [companies.id],
    }),
    industry: one(industries, {
      fields: [companiesToIndustries.industryId],
      references: [industries.id],
    }),
  })
);
