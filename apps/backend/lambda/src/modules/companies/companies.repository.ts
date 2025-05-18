import { Inject, Injectable } from '@nestjs/common';
import { CompaniesQuery } from 'api';
import {
  companies,
  companyTranslations,
  companiesToIndustries,
  industryTranslations,
  salaryCurrencies,
  positions,
  salaries,
} from 'database';
import {
  and,
  asc,
  count,
  desc,
  eq,
  exists,
  ilike,
  inArray,
  sql,
  SQL,
} from 'drizzle-orm';

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
      orderBy:
        query?.order === 'asc'
          ? asc(this.mapCompaniesSorting(query))
          : desc(this.mapCompaniesSorting(query)),
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
                inArray(companiesToIndustries.industryId, industry),
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

  private mapCompaniesSorting(query: CompaniesQuery = {}) {
    const { sort } = query;

    switch (sort) {
      case 'positions':
        return sql`(
          SELECT sub.positions_count
          FROM (
            SELECT companies.id, COUNT(positions.id) AS positions_count
            FROM companies
            LEFT JOIN positions ON positions.company_id = companies.id
            GROUP BY companies.id
          ) AS sub
          WHERE sub.id = companies.id
        )`;
        break;
      case 'averageSalary':
        return sql`(
          SELECT sub.average_salary
          FROM (
            SELECT
              companies.id,
              AVG(salary_currencies.amount) AS average_salary
            FROM
              companies
            JOIN
              positions ON positions.company_id = companies.id
            JOIN
              salaries ON salaries.id = positions.salary_id
            JOIN
              salary_currencies ON salary_currencies.salary_id = salaries.id
            GROUP BY
              companies.id
          ) AS sub
          WHERE sub.id = companies.id
        )`;
        break;
      default:
        return companies.createdAt;
        break;
    }
  }
}
