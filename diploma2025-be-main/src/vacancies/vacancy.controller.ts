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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Vacancies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('vacancies')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Roles(Role.Employer, Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Create a new vacancy' })
  @ApiResponse({ status: 201, description: 'Vacancy created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacancyService.createVacancy(createVacancyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all open vacancies' })
  @ApiResponse({ status: 200, description: 'List of vacancies.' })
  async findAll() {
    return this.vacancyService.getAllVacancies();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific vacancy' })
  @ApiResponse({ status: 200, description: 'Vacancy details.' })
  @ApiResponse({ status: 404, description: 'Vacancy not found.' })
  async findOne(@Param('id') id: string) {
    return this.vacancyService.getVacancyById(id);
  }

  @Roles(Role.Employer, Role.Admin)
  @Put(':id')
  @ApiOperation({ summary: 'Update a specific vacancy' })
  @ApiResponse({ status: 200, description: 'Vacancy updated successfully.' })
  @ApiResponse({ status: 404, description: 'Vacancy not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateVacancyDto: UpdateVacancyDto,
  ) {
    return this.vacancyService.updateVacancy(id, updateVacancyDto);
  }

  @Roles(Role.Employer, Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove a specific vacancy' })
  @ApiResponse({ status: 200, description: 'Vacancy deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Vacancy not found.' })
  async remove(@Param('id') id: string) {
    return this.vacancyService.deleteVacancy(id);
  }
}
