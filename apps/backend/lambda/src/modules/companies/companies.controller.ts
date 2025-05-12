import { Controller } from '@nestjs/common';
import { TsRest, tsRestHandler, TsRestHandler } from '@ts-rest/nest';

import { contract } from 'api';

import { CompaniesService } from './companies.service';

@Controller()
@TsRest({ validateResponses: true })
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @TsRestHandler(contract.companies.getCompanies)
  async getCompanies() {
    return tsRestHandler(contract.companies.getCompanies, async () => {
      const companies = await this.companiesService.getCompanies();

      return {
        status: 200,
        body: {
          companies,
        },
      };
    });
  }

  @TsRestHandler(contract.companies.getCompany)
  async getCompany() {
    return tsRestHandler(contract.companies.getCompany, async ({ params }) => {
      const company = await this.companiesService.getCompany(params.id);

      return {
        status: 200,
        body: {
          company,
        },
      };
    });
  }
}
