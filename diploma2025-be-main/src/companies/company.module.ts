import { Module } from '@nestjs/common';
import { CompaniesService } from './company.service';
import { CompaniesController } from './company.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
