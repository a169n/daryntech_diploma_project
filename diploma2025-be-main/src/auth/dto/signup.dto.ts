import {
  IsOptional,
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 'john_doe', description: 'Unique username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'Password for user account',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'Confirmation Password for user account',
  })
  @IsNotEmpty()
  @MinLength(6)
  confirmPassword: string;

  @ApiPropertyOptional({
    example: 'http://example.com/avatar.jpg',
    description: "URL of the user's avatar",
  })
  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: 'Software Engineer',
    description: 'Current position of the user',
  })
  @IsOptional()
  @IsString()
  position: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: 'ed5f6886-7c05-4ec8-86d2-bf409e3cabdf',
    description: 'Associated company ID',
  })
  @IsUUID()
  companyId: string;
}
