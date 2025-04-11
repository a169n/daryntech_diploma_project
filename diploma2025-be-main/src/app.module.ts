import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApplicationModule } from './application/application.module';
import { VacancyModule } from './vacancies/vacancy.module';
import { PrismaModule } from '../prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { CompaniesModule } from './companies/company.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ApplicationModule,
    VacancyModule,
    PrismaModule,
    CompaniesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
