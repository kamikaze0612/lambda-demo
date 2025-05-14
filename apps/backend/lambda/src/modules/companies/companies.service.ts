import { Injectable, NotFoundException } from '@nestjs/common';
import { CompaniesQuery } from 'api';

import { CompaniesRepository } from './companies.repository';

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesRepository: CompaniesRepository) {}

  async getCompanies(query: CompaniesQuery, lang: string) {
    const companies = await this.companiesRepository.getCompanies(query, lang);

    return companies.map((company) => this.transformCompany(company));
  }

  async getCompany(id: number, lang: string) {
    const company = await this.companiesRepository.getCompany(id, lang);

    if (!company) {
      throw new NotFoundException('COMPANY_NOT_FOUND');
    }

    return this.transformCompany(company);
  }

  private transformCompany(data: any) {
    return {
      id: data.id,
      email: data.email,
      phoneNumber: data.phoneNumber,
      websiteUrl: data.websiteUrl,
      isFeatured: data.isFeatured,
      translation: data.translations.find(Boolean),
      positions: data.positions.map((position: any) => ({
        id: position.id,
        salary: position.salary.salaryCurrencies.find(Boolean),
      })),
      industries: data.companyToIndustries.map((industry: any) => ({
        id: industry.industry.id,
        name: industry.industry.translations.find(Boolean).name,
      })),
    };
  }
}
