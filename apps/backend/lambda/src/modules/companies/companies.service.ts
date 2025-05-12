import { Injectable, NotFoundException } from '@nestjs/common';

import { CompaniesRepository } from './companies.repository';

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesRepository: CompaniesRepository) {}

  async getCompanies() {
    return this.companiesRepository.getCompanies();
  }

  async getCompany(id: number) {
    const company = await this.companiesRepository.getCompany(id);

    if (!company) {
      throw new NotFoundException('COMPANY_NOT_FOUND');
    }

    return company;
  }
}
