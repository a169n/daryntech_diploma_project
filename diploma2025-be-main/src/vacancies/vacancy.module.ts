import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule

@Module({
  imports: [PrismaModule, AuthModule, HttpModule],
  controllers: [VacancyController],
  providers: [VacancyService],
})
export class VacancyModule {}
