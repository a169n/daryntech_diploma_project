import { IsString, IsEmail, IsOptional, IsUUID, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Unique username' })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'Password for user account',
  })
  @IsString()
  password: string;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'applicant', description: 'Role of the user' })
  @IsString()
  role: any;

  @ApiPropertyOptional({
    example: 'http://example.com/avatar.jpg',
    description: "URL of the user's avatar",
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiPropertyOptional({
    example: 'Software Engineer',
    description: 'Current position of the user',
  })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiPropertyOptional({
    example: 3,
    description: 'Number of successful referrals made by the user',
  })
  @IsOptional()
  @IsInt()
  referralCount?: number;

  @ApiPropertyOptional({
    example: 'ed5f6886-7c05-4ec8-86d2-bf409e3cabdf',
    description: 'Associated company ID',
  })
  @IsOptional()
  company?: any;
}
