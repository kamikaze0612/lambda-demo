import * as companies from "./companies";
import * as companyTranslations from "./company_translations";
import * as industries from "./industries";
import * as industryTranslations from "./industry_translations";
export * from "./companies";
export * from "./company_translations";
export * from "./industries";
export * from "./industry_translations";

export const schema = {
  ...industries,
  ...industryTranslations,
  ...companies,
  ...companyTranslations,
};
export type Schema = typeof schema;
