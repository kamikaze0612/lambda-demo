import { Controller } from '@nestjs/common';
import { TsRest, tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { CompaniesResponseBody, CompanyResponseBody, contract } from 'api';
import { I18n, I18nContext } from 'nestjs-i18n';

import { CompaniesService } from './companies.service';

@Controller()
@TsRest({ validateResponses: true })
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @TsRestHandler(contract.companies.getCompanies)
  async getCompanies(@I18n() i18n: I18nContext) {
    return tsRestHandler(contract.companies.getCompanies, async ({ query }) => {
      const companies = await this.companiesService.getCompanies(
        query,
        i18n.lang,
      );

      const parsedData = CompaniesResponseBody.parse(companies);

      return {
        status: 200,
        body: parsedData,
      };
    });
  }

  @TsRestHandler(contract.companies.getCompany)
  async getCompany(@I18n() i18n: I18nContext) {
    return tsRestHandler(contract.companies.getCompany, async ({ params }) => {
      const company = await this.companiesService.getCompany(
        params.id,
        i18n.lang,
      );

      const parsedData = CompanyResponseBody.parse(company);

      return {
        status: 200,
        body: parsedData,
      };
    });
  }
}
