import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsEnum, IsUUID } from 'class-validator';
import { VacancyStatus } from '@prisma/client';

export class CreateVacancyDto {
  @ApiProperty({
    example: '231564',
    description: 'ID of the company',
  })
  @IsNotEmpty()
  companyId: string;

  @ApiProperty({
    example: 'Software Developer',
    description: 'Title of the job vacancy',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Looking for a skilled software developer.',
    description: 'Job description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'New York',
    description: 'Location of the job',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: VacancyStatus.open,
    description: 'Status of the vacancy',
  })
  @IsEnum(VacancyStatus)
  @IsNotEmpty()
  status: VacancyStatus;

  @ApiProperty({
    example: '5000 $',
    description: 'Minimum salary for the position',
  })
  @IsString()
  @IsNotEmpty()
  minSalary: string;

  @ApiProperty({
    example: '10000 $',
    description: 'Maximum salary for the position',
  })
  @IsString()
  @IsNotEmpty()
  maxSalary: string;

  @ApiProperty({
    example: 'Full-time',
    description: 'Type of the vacancy',
  })
  @IsString()
  @IsNotEmpty()
  type: string;
}
