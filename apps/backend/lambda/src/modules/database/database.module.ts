import { Global, Inject, Module } from '@nestjs/common';
import type { Sql } from 'postgres';

import { databaseProviderToken } from '@/common/constants/provider_tokens.constants';

import { supabaseProviders, type Database } from './database.providers';

@Global()
@Module({
  exports: [...supabaseProviders],
  providers: [...supabaseProviders],
})
export class DatabaseModule {
  constructor(
    @Inject(databaseProviderToken)
    private readonly database: Sql,
  ) {}

  async onModuleDestroy() {
    await this.database.end();
  }
}
