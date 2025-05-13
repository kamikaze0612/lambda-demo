import { salaries } from "database";
import { createSelectSchema } from "drizzle-zod";

export const SalaryModel = createSelectSchema(salaries);
