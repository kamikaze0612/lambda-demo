import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration, validate } from '@/config/configuration';
import { CompaniesModule } from '@/modules/companies/companies.module';
import { DatabaseModule } from '@/modules/database/database.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CompaniesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
