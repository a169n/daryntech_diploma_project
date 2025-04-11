import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  IsUUID,
  IsInt,
  ValidateIf,
  Equals,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty({ example: 'john_doe', description: 'Unique username' })
  @IsString()
  username: string;

  @IsOptional()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @IsOptional()
  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'Password for user account',
  })
  @IsString()
  password?: string;

  @IsOptional()
  @ValidateIf((o) => o.password) // Only validate if password is provided
  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'Confirm password to verify password update',
  })
  @IsString()
  // @Equals('password', {
  //   message: 'Confirm password must match the password',
  // }) // Ensure confirmPassword matches password
  confirmPassword?: string;

  @IsOptional()
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsString()
  firstName?: string;

  @IsOptional()
  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsString()
  lastName?: string;

  @IsOptional()
  @ApiProperty({ example: 'applicant', description: 'Role of the user' })
  @IsString()
  role?: any;

  @IsOptional()
  @ApiPropertyOptional({
    example: 'http://example.com/avatar.jpg',
    description: "URL of the user's avatar",
  })
  @IsString()
  avatar?: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: 'Software Engineer',
    description: 'Current position of the user',
  })
  @IsString()
  position?: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: 3,
    description: 'Number of successful referrals made by the user',
  })
  @IsInt()
  referralCount?: number;

  @IsOptional()
  @ApiPropertyOptional({
    example: 'ed5f6886-7c05-4ec8-86d2-bf409e3cabdf',
    description: 'Associated company ID',
  })
  company?: any;

  @ApiPropertyOptional({
    example: 'http://example.com/my-updated-cv.pdf',
    description: 'Updated link to CV or resume',
  })
  @IsString()
  @IsOptional()
  cv?: string;
}
