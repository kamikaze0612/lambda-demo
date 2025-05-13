import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
} from 'nestjs-i18n';
import path from 'path';

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
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      resolvers: [new HeaderResolver(['x-lang']), new AcceptLanguageResolver()],
      loaderOptions: {
        path: path.join(__dirname, '../../i18n/'),
        watch: true,
      },
      typesOutputPath: path.join(
        __dirname,
        '../../generated/i18n.generated.ts',
      ),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
