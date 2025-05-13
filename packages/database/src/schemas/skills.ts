import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { positions } from "./positions";
import { timestamps } from "./time_stamps";

export const skills = pgTable("skills", () => ({
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  positionId: integer("position_id").references(() => positions.id, {
    onDelete: "cascade",
  }),
  ...timestamps,
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  position: one(positions, {
    fields: [skills.positionId],
    references: [positions.id],
  }),
}));
