import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule

@Module({
  imports: [PrismaModule, AuthModule, HttpModule], // Add HttpModule here
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
