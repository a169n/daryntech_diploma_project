import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Errors } from 'src/common/errors/errors';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async createCompany(createCompanyDto: CreateCompanyDto) {
    const { hhId, name, logoUrls } = createCompanyDto;

    const existingCompany = await this.prisma.company.findFirst({
      where: { hhId },
    });

    if (existingCompany) {
      throw new BadRequestException(Errors.COMPANY_EXISTS.message);
    }

    return this.prisma.company.create({
      data: {
        hhId,
        name,
        logoUrls: logoUrls ? JSON.parse(logoUrls) : null,
      },
    });
  }

  async findCompanyByHHId(id: string) {
    return this.prisma.company.findFirst({
      where: { hhId: id },
    });
  }

  async findCompanyById(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        employees: true, // Include all employees
        Vacancies: {
          where: {
            status: 'open', // Filter vacancies to include only those with status 'open'
          },
        },
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  async getAllCompanies() {
    return this.prisma.company.findMany();
  }

  async updateCompany(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findCompanyById(id);

    return this.prisma.company.update({
      where: { id },
      data: {
        ...updateCompanyDto,
        logoUrls: updateCompanyDto.logoUrls
          ? JSON.parse(updateCompanyDto.logoUrls)
          : company.logoUrls,
      },
    });
  }

  async deleteCompany(id: string) {
    await this.findCompanyById(id);

    return this.prisma.company.delete({
      where: { id },
    });
  }
}
