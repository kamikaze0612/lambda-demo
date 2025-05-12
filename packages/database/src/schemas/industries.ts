import { relations } from "drizzle-orm";
import { pgTable, serial } from "drizzle-orm/pg-core";

import { timestamps } from "./time_stamps";
import { industryTranslations } from "./industry_translations";

export const industries = pgTable("industries", () => ({
  id: serial("id").primaryKey(),
  ...timestamps,
}));

export const industriesRelations = relations(industries, ({ many }) => ({
  translations: many(industryTranslations),
}));
