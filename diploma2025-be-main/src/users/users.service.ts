import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CompaniesService } from '../companies/company.service';
import { Errors } from 'src/common/errors/errors';
import { CreateVacancyDto } from 'src/vacancies/dto/create-vacancy.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private companiesService: CompaniesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, username } = createUserDto;
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userExists = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (userExists) {
      throw new BadRequestException(Errors.USER_EXISTS.message);
    }
    const { company: companyDataJSON, ...userData } = createUserDto;
    const companyData = companyDataJSON
      ? JSON.parse(companyDataJSON)
      : undefined;

    let companyId;
    if (companyData) {
      const company = await this.companiesService.findCompanyByHHId(
        companyData.hhId,
      );
      if (!company) {
        const newCompany = await this.companiesService.createCompany({
          hhId: companyData.hhId,
          name: companyData.name,
          logoUrls: JSON.stringify(companyData.logo_urls),
        });
        companyId = newCompany.id;
      } else {
        companyId = company.id;
      }
    }

    return this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        companyId,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: { Company: true },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { Company: true },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    isAdmin: boolean = false,
  ) {
    // Check if email or username is being updated
    if (updateUserDto.email || updateUserDto.username) {
      throw new BadRequestException(
        Errors.USERNAME_EMAIL_CANNOT_BE_UPDATED.message,
      );
    }

    // For non-admin users, validate confirmPassword if password is being updated
    if (!isAdmin && updateUserDto.password && !updateUserDto.confirmPassword) {
      throw new BadRequestException(
        Errors.PASSWORD_CONFIRM_PASSWORD_REQUIRED.message,
      );
    }

    const hashedPassword = updateUserDto.password
      ? await bcrypt.hash(updateUserDto.password, 10)
      : undefined;
    const {
      company: companyDataJSON,
      confirmPassword,
      ...restData
    } = updateUserDto;
    if (
      !isAdmin &&
      updateUserDto.password &&
      confirmPassword !== updateUserDto.password
    ) {
      throw new BadRequestException(Errors.PASSWORDS_DO_NOT_MATCH.message);
    }
    const companyData = companyDataJSON
      ? JSON.parse(companyDataJSON)
      : undefined;

    let companyId;
    if (companyData) {
      const company = await this.companiesService.findCompanyByHHId(
        companyData.hhId,
      );
      if (!company) {
        const newCompany = await this.companiesService.createCompany({
          hhId: companyData.hhId,
          name: companyData.name,
          logoUrls: JSON.stringify(companyData.logo_urls),
        });
        companyId = newCompany.id;
      } else {
        companyId = company.id;
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...restData,
        password: hashedPassword,
        companyId,
        cv: updateUserDto.cv,
        avatar: updateUserDto.avatar,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  private async getOrCreateCompany(companyName: string, hhId: string) {
    let company = await this.prisma.company.findFirst({
      where: { name: companyName },
    });

    if (!company) {
      company = await this.prisma.company.create({
        data: {
          hhId: hhId,
          name: companyName,
          logoUrls: null,
        },
      });
    }

    return company;
  }

  // async updateVacancy(id: string, updateVacancyDto: UpdateVacancyDto) {
  //   const company = updateVacancyDto.companyId
  //     ? await this.getOrCreateCompany(updateVacancyDto.companyId)
  //     : null;

  //   return this.prisma.vacancy.update({
  //     where: { id },
  //     data: {
  //       ...updateVacancyDto,
  //       companyId: company?.id,
  //     },
  //   });
  // }
}
