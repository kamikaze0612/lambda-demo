import { relations } from "drizzle-orm";
import { pgTable, serial, smallint, text, integer } from "drizzle-orm/pg-core";

import { salaries } from "./salaries";
import { skills } from "./skills";
import { timestamps } from "./time_stamps";

export const positions = pgTable("positions", () => ({
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  type: smallint("type").notNull(),
  salaryId: integer("salary_id").references(() => salaries.id, {
    onDelete: "cascade",
  }),
  ...timestamps,
}));

export const positionsRelations = relations(positions, ({ one, many }) => ({
  salary: one(salaries, {
    fields: [positions.salaryId],
    references: [salaries.id],
  }),
  skills: many(skills),
}));
