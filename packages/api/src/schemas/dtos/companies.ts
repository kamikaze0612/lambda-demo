import { CompanyModel, CompanyTranslationModel } from "@/models";
import { z } from "zod";

export const CompaniesResponseBody = z.object({
  companies: CompanyModel.extend({
    translations: CompanyTranslationModel.array(),
  }).array(),
});

export const CompanyResponseBody = z.object({
  company: CompanyModel.extend({
    translations: CompanyTranslationModel.array(),
  }),
});
