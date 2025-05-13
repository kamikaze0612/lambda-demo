import { relations } from "drizzle-orm";
import { pgTable, serial } from "drizzle-orm/pg-core";

import { positions } from "./positions";
import { salaryCurrencies } from "./salary_currencies";
import { timestamps } from "./time_stamps";

export const salaries = pgTable("salaries", () => ({
  id: serial("id").primaryKey(),
  ...timestamps,
}));

export const salariesRelations = relations(salaries, ({ many }) => ({
  salaryCurrencies: many(salaryCurrencies),
  positions: many(positions),
}));
