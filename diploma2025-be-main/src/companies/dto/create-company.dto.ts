import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsJSON, IsInt } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    example: '231564',
    description: 'ID of the company',
  })
  hhId: string;
  @ApiProperty({
    example: 'Astana IT University',
    description: 'Name of the company',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example:
      '{ "original": "https://img.hhcdn.ru/employer-logo-original/780155.jpg" }',
    description: 'Logo URLs in JSON format',
  })
  @IsOptional()
  @IsJSON()
  logoUrls: string;
}
