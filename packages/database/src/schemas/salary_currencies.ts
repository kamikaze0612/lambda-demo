import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  integer,
  varchar,
  doublePrecision,
} from "drizzle-orm/pg-core";

import { salaries } from "./salaries";
import { timestamps } from "./time_stamps";

export const salaryCurrencies = pgTable("salary_currencies", () => ({
  id: serial("id").primaryKey(),
  salaryId: integer("salary_id").references(() => salaries.id, {
    onDelete: "cascade",
  }),
  currency: varchar("currency", { length: 3 }).notNull(),
  amount: doublePrecision("amount").notNull(),
  ...timestamps,
}));

export const salaryCurrenciesRelations = relations(
  salaryCurrencies,
  ({ one }) => ({
    salary: one(salaries, {
      fields: [salaryCurrencies.salaryId],
      references: [salaries.id],
    }),
  })
);
