import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsJSON, IsInt } from 'class-validator';

export class UpdateCompanyDto {
  @ApiProperty({ example: 'Kaspi Drink', description: 'Name of the company' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: '{ "90x90": "https://logo.png", "original": "https://logo.png" }',
    description: 'Logo URLs in JSON format',
  })
  @IsOptional()
  @IsJSON()
  logoUrls?: string;
}
