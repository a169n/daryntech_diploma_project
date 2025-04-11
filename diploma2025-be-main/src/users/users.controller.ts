import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { UploadService } from './upload.service';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly uploadService: UploadService,
  ) {}

  @Roles(Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get logged-in user details' })
  @ApiResponse({ status: 200, description: 'User details.' })
  async findMe(@GetUser() user: { userId: string }) {
    return this.usersService.findOne(user.userId);
  }

  @Put('me')
  @ApiOperation({ summary: 'Update logged-in user details' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @UseInterceptors(AnyFilesInterceptor()) // Handle multiple files
  async updateMe(
    @UploadedFiles() files: Array<Express.Multer.File>, // Use UploadedFiles to get all files
    @GetUser() user: { userId: string },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    let fileUrl: string | undefined;
    let avatarUrl: string | undefined;

    // Loop through the files and process them
    for (const file of files) {
      if (file.fieldname === 'cv') {
        fileUrl = await this.uploadService.uploadFile(file, user.userId);
      } else if (file.fieldname === 'avatar') {
        avatarUrl = await this.uploadService.uploadAvatar(file, user.userId);
      }
    }

    return this.usersService.update(user.userId, {
      ...updateUserDto,
      cv: fileUrl,
      avatar: avatarUrl,
    });
  }
  @Roles(Role.Admin)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users.' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User details.' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: { userId: string; role: Role },
  ) {
    const isAdmin = user.role === Role.Admin;
    return this.usersService.update(id, updateUserDto, isAdmin);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
