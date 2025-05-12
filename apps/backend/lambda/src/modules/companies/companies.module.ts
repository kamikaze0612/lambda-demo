import { Module } from '@nestjs/common';

import { CompaniesController } from './companies.controller';
import { CompaniesRepository } from './companies.repository';
import { CompaniesService } from './companies.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesRepository, CompaniesService],
  exports: [CompaniesRepository, CompaniesService],
})
export class CompaniesModule {}
