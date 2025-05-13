import { industryTranslations } from "database";
import { createSelectSchema } from "drizzle-zod";

export const IndustryTranslationModel =
  createSelectSchema(industryTranslations);
