import * as companies from "./companies";
import * as companyTranslations from "./company_translations";
import * as industries from "./industries";
import * as industryTranslations from "./industry_translations";
import * as positions from "./positions";
import * as salaries from "./salaries";
import * as salaryCurrencies from "./salary_currencies";
import * as skills from "./skills";
import * as companiesToIndustries from "./companies_to_industries";

export * from "./companies";
export * from "./company_translations";
export * from "./industries";
export * from "./industry_translations";
export * from "./positions";
export * from "./salaries";
export * from "./salary_currencies";
export * from "./skills";
export * from "./companies_to_industries";

export const schema = {
  ...companies,
  ...companyTranslations,
  ...industries,
  ...industryTranslations,
  ...positions,
  ...salaries,
  ...salaryCurrencies,
  ...skills,
  ...companiesToIndustries,
};
export type Schema = typeof schema;
