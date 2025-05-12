import { relations } from "drizzle-orm";
import {
  foreignKey,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

import { companies } from "./companies";
import { timestamps } from "./time_stamps";

export const companyTranslations = pgTable(
  "company_translations",
  () => ({
    id: serial("id").primaryKey(),
    companyId: integer("company_id").references(() => companies.id, {
      onDelete: "cascade",
    }),
    lang: varchar("lang", { length: 2 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    ...timestamps,
  }),
  (t) => [
    primaryKey({ columns: [t.companyId, t.lang] }),
    foreignKey({
      columns: [t.companyId],
      foreignColumns: [companies.id],
    }),
  ]
);

export const companyTranslationsRelations = relations(
  companyTranslations,
  ({ one }) => ({
    company: one(companies, {
      fields: [companyTranslations.companyId],
      references: [companies.id],
    }),
  })
);
