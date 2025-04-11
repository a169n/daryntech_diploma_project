import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApplicationStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({
    example: '26530a0f-d220-4e48-a3d5-e5d5f7ecf29b',
    description: 'The UUID of the user applying',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: '26530a0f-d220-4e48-a3d5-e5d5f7ecf29b',
    description: 'The UUID of the receiver',
  })
  @IsUUID()
  @IsNotEmpty()
  receiverId: string;

  @ApiProperty({
    example: 'dd6d9173-2aa0-406c-bb60-0cb6fee61bfe',
    description: 'The UUID of the vacancy being applied for',
  })
  @IsUUID()
  @IsNotEmpty()
  vacancyId: string;

  @ApiProperty({
    example: ApplicationStatus.pending,
    description: 'Current status of the application',
  })
  @IsEnum(ApplicationStatus)
  @IsNotEmpty()
  status: ApplicationStatus;

  @ApiProperty({
    example: 'Looking forward to joining the team!',
    description: "Applicant's comments",
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiPropertyOptional({
    example: 'http://example.com/my-cv.pdf',
    description: 'Link to CV or resume',
  })
  @IsString()
  @IsOptional()
  cv?: string;

  @ApiPropertyOptional({
    example: '["JavaScript", "Node.js", "React"]',
    description: 'Extracted skills from the CV',
  })
  @IsOptional()
  extractedSkills?: any;

  @ApiPropertyOptional({
    example: '{"JavaScript": 90, "Node.js": 80, "React": 85}',
    description: 'Comparison result of the skills',
  })
  @IsOptional()
  comparisonResult?: any;

  @ApiPropertyOptional({
    example: 85.5,
    description: 'Match percentage of the skills',
  })
  @IsOptional()
  matchPercentage?: number;
}
