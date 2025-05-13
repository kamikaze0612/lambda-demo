import { Inject, Injectable } from '@nestjs/common';
import { CompaniesQuery } from 'api';
import {
  companies,
  companyTranslations,
  companiesToIndustries,
  industryTranslations,
  salaryCurrencies,
} from 'database';
import { and, eq, exists, ilike, SQL } from 'drizzle-orm';

import { databaseProviderToken } from '@/common/constants/provider_tokens.constants';
import type { Database } from '@/modules/database/database.providers';

@Injectable()
export class CompaniesRepository {
  constructor(
    @Inject(databaseProviderToken)
    private readonly database: Database,
  ) {}

  async getCompanies(query: CompaniesQuery, lang: string) {
    const currency = lang === 'en' ? 'USD' : 'MNT';

    const where = and(...this.mapCompaniesQuery(query));

    return await this.database.query.companies.findMany({
      where,
      with: {
        translations: {
          where: eq(companyTranslations.lang, lang),
        },
        positions: {
          with: {
            salary: {
              with: {
                salaryCurrencies: {
                  where: eq(salaryCurrencies.currency, currency),
                },
              },
            },
          },
        },
        companyToIndustries: {
          with: {
            industry: {
              with: {
                translations: {
                  where: eq(industryTranslations.lang, lang),
                },
              },
            },
          },
        },
      },
    });
  }

  async getCompany(id: number, lang: string) {
    const currency = lang === 'en' ? 'USD' : 'MNT';

    return await this.database.query.companies.findFirst({
      where: eq(companies.id, id),
      with: {
        translations: {
          where: eq(companyTranslations.lang, lang),
        },
        positions: {
          with: {
            salary: {
              with: {
                salaryCurrencies: {
                  where: eq(salaryCurrencies.currency, currency),
                },
              },
            },
          },
        },
        companyToIndustries: {
          with: {
            industry: {
              with: {
                translations: {
                  where: eq(industryTranslations.lang, lang),
                },
              },
            },
          },
        },
      },
    });
  }

  private mapCompaniesQuery(query: CompaniesQuery = {}) {
    const { industry, keyword } = query;

    const where: SQL<unknown | undefined>[] = [];

    if (industry) {
      where.push(
        exists(
          this.database
            .select()
            .from(companiesToIndustries)
            .where(
              and(
                eq(companiesToIndustries.companyId, companies.id),
                eq(companiesToIndustries.industryId, industry),
              ),
            ),
        ),
      );
    }

    if (keyword) {
      where.push(
        exists(
          this.database
            .select()
            .from(companyTranslations)
            .where(
              and(
                eq(companies.id, companyTranslations.companyId),
                ilike(companyTranslations.name, `%${keyword}%`),
              ),
            ),
        ),
      );
    }

    return where;
  }
}
