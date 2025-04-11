import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApplicationStatus } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateApplicationDto {
  @ApiPropertyOptional({
    example: ApplicationStatus.approved,
    description: 'New status of the application',
  })
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @ApiPropertyOptional({
    example: 'Updated comment.',
    description: 'Additional notes or comments on the application',
  })
  @IsOptional()
  @IsString()
  comment?: string;
  @ApiPropertyOptional({
    example: 'http://example.com/my-updated-cv.pdf',
    description: 'Updated link to CV or resume',
  })
  @IsString()
  @IsOptional()
  cv?: string;
}
