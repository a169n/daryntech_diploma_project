import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module'; // Import the AuthModule
import { CompaniesService } from 'src/companies/company.service';
import { UploadService } from './upload.service';

@Module({
  imports: [AuthModule], // Ensure AuthModule (which exports JwtModule) is imported
  controllers: [UsersController],
  providers: [UsersService, PrismaService, CompaniesService, UploadService],
})
export class UsersModule {}
