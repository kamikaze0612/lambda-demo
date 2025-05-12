import { companies, companyTranslations } from "database";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const CompanyModel = createSelectSchema(companies);
export type CompanyModel = z.infer<typeof CompanyModel>;

export const CompanyTranslationModel = createSelectSchema(companyTranslations);
export type CompanyTranslationModel = z.infer<typeof CompanyTranslationModel>;
