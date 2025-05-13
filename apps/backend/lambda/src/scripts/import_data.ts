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
}

interface SkillRecord {
  id: number;
  title: string;
  position_id: number;
}

interface CompanyIndustryRecord {
  id: number;
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

    // Import company-industry relationships (if you have this relation table)
    try {
      const companyIndustryRecords = await readCsvFile<CompanyIndustryRecord>(
        'company_industries.csv',
      );
      for (const record of companyIndustryRecords) {
        // You would need to create this table in your schema if you want to use it
        console.log(
          `Linking company ${record.company_id} with industry ${record.industry_id}`,
        );
      }
      console.log(
        `Imported ${companyIndustryRecords.length} company-industry relationships`,
      );
    } catch (error) {
      console.log(
        'No company-industry relationships to import or table not defined.',
      );
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData().catch(console.error);
