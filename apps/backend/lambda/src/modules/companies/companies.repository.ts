import { Inject, Injectable } from '@nestjs/common';
import { companies } from 'database';
import { eq } from 'drizzle-orm';

import { databaseProviderToken } from '@/common/constants/provider_tokens.constants';
import type { Database } from '@/modules/database/database.providers';

@Injectable()
export class CompaniesRepository {
  constructor(
    @Inject(databaseProviderToken)
    private readonly database: Database,
  ) {}

  async getCompanies() {
    return await this.database.query.companies.findMany({
      with: {
        translations: true,
      },
    });
  }

  async getCompany(id: number) {
    return await this.database.query.companies.findFirst({
      where: eq(companies.id, id),
      with: {
        translations: true,
      },
    });
  }
}
