import { Pool } from '@neondatabase/serverless';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { schema } from 'database';
import type { Schema } from 'database';
import type { ExtractTablesWithRelations } from 'drizzle-orm';
import {
  drizzle,
  type NeonQueryResultHKT,
  type NeonDatabase,
} from 'drizzle-orm/neon-serverless';
import type { PgTransaction } from 'drizzle-orm/pg-core';

import {
  databaseClientProviderToken,
  databaseProviderToken,
} from '@/common/constants/provider_tokens.constants';

export const supabaseProviders = [
  {
    imports: [ConfigModule],
    inject: [ConfigService],
    provide: databaseClientProviderToken,
    useFactory: (configService: ConfigService) => {
      const url = configService.get<string>('database.url')!;

      const client = new Pool({ connectionString: url });

      return client;
    },
  },
  {
    inject: [databaseClientProviderToken],
    provide: databaseProviderToken,
    useFactory: async (client: Pool) => {
      const db = drizzle(client, { schema });

      return db;
    },
  },
];

export type Database = NeonDatabase<Schema>;

export type Transaction = PgTransaction<
  NeonQueryResultHKT,
  Schema,
  ExtractTablesWithRelations<Schema>
>;
