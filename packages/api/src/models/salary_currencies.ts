import { salaryCurrencies } from "database";
import { createSelectSchema } from "drizzle-zod";

export const SalaryCurrencyModel = createSelectSchema(salaryCurrencies);
