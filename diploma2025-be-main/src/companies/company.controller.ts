import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CompaniesService } from './company.service';
// import { CreateCompanyDto } from './dto/create-company.dto';
// import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  // @Post()
  // @ApiOperation({ summary: 'Create a new company' })
  // @ApiResponse({ status: 201, description: 'Company created successfully.' })
  // async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
  //   return this.companiesService.createCompany(createCompanyDto);
  // }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'List of all companies.' })
  async getAllCompanies() {
    return this.companiesService.getAllCompanies();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiResponse({ status: 200, description: 'The company details.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  async getCompanyById(@Param('id') id: string) {
    return this.companiesService.findCompanyById(id);
  }

  // @Put(':id')
  // @ApiOperation({ summary: 'Update a company' })
  // @ApiResponse({ status: 200, description: 'Company updated successfully.' })
  // @ApiResponse({ status: 404, description: 'Company not found.' })
  // async updateCompany(
  //   @Param('id') id: string,
  //   @Body() updateCompanyDto: UpdateCompanyDto,
  // ) {
  //   return this.companiesService.updateCompany(id, updateCompanyDto);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a company' })
  // @ApiResponse({ status: 200, description: 'Company deleted successfully.' })
  // @ApiResponse({ status: 404, description: 'Company not found.' })
  // async deleteCompany(@Param('id') id: string) {
  //   return this.companiesService.deleteCompany(id);
  // }
}
