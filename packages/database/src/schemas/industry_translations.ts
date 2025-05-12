import {
  foreignKey,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

import { industries } from "./industries";
import { timestamps } from "./time_stamps";
import { relations } from "drizzle-orm";

export const industryTranslations = pgTable(
  "industry_translations",
  () => ({
    id: serial("id").primaryKey(),
    industryId: integer("industry_id").references(() => industries.id, {
      onDelete: "cascade",
    }),
    lang: varchar("lang", { length: 2 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    ...timestamps,
  }),
  (t) => [
    primaryKey({ columns: [t.industryId, t.lang] }),
    foreignKey({
      columns: [t.industryId],
      foreignColumns: [industries.id],
    }),
  ]
);

export const industryTranslationsRelations = relations(
  industryTranslations,
  ({ one }) => ({
    industry: one(industries, {
      fields: [industryTranslations.industryId],
      references: [industries.id],
    }),
  })
);
