import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Applications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @ApiOperation({
    summary: 'Create a new application',
    description:
      'Allows an applicant to submit a new job application along with a PDF CV file.',
  })
  @ApiResponse({
    status: 201,
    description: 'Application successfully created with a link to the CV.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Possible file issues or validation errors.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only applicants can create applications.',
  })
  @Roles(Role.Applicant)
  @Post()
  async create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationService.createApplication({
      ...createApplicationDto,
    });
  }

  // @ApiOperation({
  //   summary: 'Get CV',
  //   description:
  //     'Retrieves a pre-signed URL to access the CV file stored in S3.',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Pre-signed URL retrieved successfully.',
  // })
  // @ApiResponse({
  //   status: 404,
  //   description: 'Not Found. The specified CV does not exist.',
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: 'Forbidden. Only authorized users can access this endpoint.',
  // })
  // @Get('cv/:key(*)')
  // async getCv(@Param('key') key: string, @GetUser() _user: { userId: string }) {
  //   const url = await this.uploadService.generatePresignedUrl(key);
  //   return { url };
  // }
  @Get()
  @ApiOperation({ summary: 'Get all applications' })
  @ApiResponse({ status: 200, description: 'List of applications.' })
  async findAll() {
    return this.applicationService.getAllApplications();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific application by ID' })
  @ApiResponse({ status: 200, description: 'Application details.' })
  @ApiResponse({ status: 404, description: 'Application not found.' })
  async findOne(@Param('id') id: string) {
    return this.applicationService.getApplicationById(id);
  }

  @Roles(Role.Admin, Role.Employer)
  @Put(':id')
  @ApiOperation({ summary: 'Update an application' })
  @ApiResponse({
    status: 200,
    description: 'Application successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Application not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationService.updateApplication(id, updateApplicationDto);
  }

  @Roles(Role.Admin, Role.Employer)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an application' })
  @ApiResponse({
    status: 200,
    description: 'Application successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Application not found.' })
  async remove(@Param('id') id: string) {
    return this.applicationService.deleteApplication(id);
  }
}
