import { IsString, IsOptional, IsDate, IsEnum } from 'class-validator';
import { VacancyStatus } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateVacancyDto {
  @ApiPropertyOptional({
    example: 'Senior Developer',
    description: 'The job title',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example: 'Responsible for developing APIs',
    description: 'Job description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'San Francisco',
    description: 'Location of the job',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    example: VacancyStatus.open,
    description: 'Current status of the vacancy',
  })
  @IsOptional()
  @IsEnum(VacancyStatus)
  status?: VacancyStatus;

  @ApiPropertyOptional({
    example: '6000',
    description: 'Minimum salary for the position',
  })
  @IsOptional()
  @IsString()
  minSalary?: string;

  @ApiPropertyOptional({
    example: '12000',
    description: 'Maximum salary for the position',
  })
  @IsOptional()
  @IsString()
  maxSalary?: string;

  @ApiPropertyOptional({
    example: 'Part-time',
    description: 'Type of the vacancy',
  })
  @IsOptional()
  @IsString()
  type?: string;
}
