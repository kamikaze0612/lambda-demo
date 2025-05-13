import { industries } from "database";
import { createSelectSchema } from "drizzle-zod";

export const IndustryModel = createSelectSchema(industries);
