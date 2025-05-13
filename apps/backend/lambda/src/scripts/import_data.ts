import { Pool } from '@neondatabase/serverless';
import {
  industries,
  industryTranslations,
  companies,
  companyTranslations,
  salaries,
  salaryCurrencies,
  positions,
  skills,
  companiesToIndustries,
  schema,
} from 'database';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

import 'dotenv/config';

const SCRIPT_DIR = __dirname;

interface IndustryRecord {
  id: number;
}

interface IndustryTranslationRecord {
  id: number;
  industry_id: number;
  lang: string;
  name: string;
  description: string;
}

interface CompanyRecord {
  id: number;
  email: string;
  phone_number: string;
  website_url: string;
}

interface CompanyTranslationRecord {
  id: number;
  company_id: number;
  lang: string;
  name: string;
  description: string;
  address: string;
}

interface SalaryRecord {
  id: number;
}

interface SalaryCurrencyRecord {
  id: number;
  salary_id: number;
  currency: string;
  amount: number;
}

interface PositionRecord {
  id: number;
  title: string;
  description: string;
  requirements: string;
  type: number;
  salary_id: number;
  company_id: number;
}

interface SkillRecord {
  id: number;
  title: string;
  position_id: number;
}

interface CompanyToIndustryRecord {
  company_id: number;
  industry_id: number;
}

async function readCsvFile<T>(filename: string): Promise<T[]> {
  const filePath = path.join(SCRIPT_DIR, filename);
  const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
  return parse(content, { columns: true, skip_empty_lines: true });
}

async function importData() {
  const client = new Pool({ connectionString: process.env.DATABASE_URL! });
  const db = drizzle(client, { schema });

  try {
    // Import industries
    const industryRecords = await readCsvFile<IndustryRecord>('industries.csv');
    for (const record of industryRecords) {
      await db.insert(industries).values({
        id: record.id,
      });
    }
    console.log(`Imported ${industryRecords.length} industries`);

    // Import industry translations
    const industryTranslationRecords =
      await readCsvFile<IndustryTranslationRecord>('industry_translations.csv');
    for (const record of industryTranslationRecords) {
      await db.insert(industryTranslations).values({
        id: record.id,
        industryId: record.industry_id,
        lang: record.lang,
        name: record.name,
        description: record.description,
      });
    }
    console.log(
      `Imported ${industryTranslationRecords.length} industry translations`,
    );

    // Import companies
    const companyRecords = await readCsvFile<CompanyRecord>('companies.csv');
    for (const record of companyRecords) {
      await db.insert(companies).values({
        id: record.id,
        email: record.email,
        phoneNumber: record.phone_number,
        websiteUrl: record.website_url,
      });
    }
    console.log(`Imported ${companyRecords.length} companies`);

    // Import company translations
    const companyTranslationRecords =
      await readCsvFile<CompanyTranslationRecord>('company_translations.csv');
    for (const record of companyTranslationRecords) {
      await db.insert(companyTranslations).values({
        id: record.id,
        companyId: record.company_id,
        lang: record.lang,
        name: record.name,
        description: record.description,
        address: record.address,
      });
    }
    console.log(
      `Imported ${companyTranslationRecords.length} company translations`,
    );

    // Import salaries
    const salaryRecords = await readCsvFile<SalaryRecord>('salaries.csv');
    for (const record of salaryRecords) {
      await db.insert(salaries).values({
        id: record.id,
      });
    }
    console.log(`Imported ${salaryRecords.length} salaries`);

    // Import salary currencies
    const salaryCurrencyRecords = await readCsvFile<SalaryCurrencyRecord>(
      'salary_currencies.csv',
    );
    for (const record of salaryCurrencyRecords) {
      await db.insert(salaryCurrencies).values({
        id: record.id,
        salaryId: record.salary_id,
        currency: record.currency,
        amount: record.amount,
      });
    }
    console.log(`Imported ${salaryCurrencyRecords.length} salary currencies`);

    // Import positions
    const positionRecords = await readCsvFile<PositionRecord>('positions.csv');
    for (const record of positionRecords) {
      await db.insert(positions).values({
        id: record.id,
        title: record.title,
        description: record.description,
        requirements: record.requirements,
        type: record.type,
        salaryId: record.salary_id,
        companyId: record.company_id,
      });
    }
    console.log(`Imported ${positionRecords.length} positions`);

    // Import skills
    const skillRecords = await readCsvFile<SkillRecord>('skills.csv');
    for (const record of skillRecords) {
      await db.insert(skills).values({
        id: record.id,
        title: record.title,
        positionId: record.position_id,
      });
    }
    console.log(`Imported ${skillRecords.length} skills`);

    // Import company-to-industry relationships
    try {
      // Try to use the new file format first
      let companyToIndustryRecords: CompanyToIndustryRecord[] = [];

      try {
        companyToIndustryRecords = await readCsvFile<CompanyToIndustryRecord>(
          'companies_to_industries.csv',
        );
      } catch (error) {
        // If new format file doesn't exist, try to convert from old format
        console.log(
          'companies_to_industries.csv not found, trying to use company_industries.csv...',
        );

        // Attempt to read the old format file and convert it
        interface OldFormatRecord {
          id: number;
          company_id: number;
          industry_id: number;
        }

        const oldRecords = await readCsvFile<OldFormatRecord>(
          'company_industries.csv',
        );

        // Convert old format to new format
        companyToIndustryRecords = oldRecords.map((record) => ({
          company_id: record.company_id,
          industry_id: record.industry_id,
        }));

        // Create the new format file for future use
        const csvContent =
          'company_id,industry_id\n' +
          companyToIndustryRecords
            .map((r) => `${r.company_id},${r.industry_id}`)
            .join('\n');

        fs.writeFileSync(
          path.join(SCRIPT_DIR, 'companies_to_industries.csv'),
          csvContent,
          { encoding: 'utf-8' },
        );

        console.log(
          'Created companies_to_industries.csv from company_industries.csv',
        );
      }

      // Insert the records
      for (const record of companyToIndustryRecords) {
        await db.insert(companiesToIndustries).values({
          companyId: record.company_id,
          industryId: record.industry_id,
        });
      }

      console.log(
        `Imported ${companyToIndustryRecords.length} company-to-industry relationships`,
      );
    } catch (error) {
      console.error(
        'Error importing company-to-industry relationships:',
        error,
      );
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await client.end();
  }
}

importData().catch(console.error);
