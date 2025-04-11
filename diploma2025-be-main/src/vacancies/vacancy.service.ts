import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { VacancyStatus } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class VacancyService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async createVacancy(createVacancyDto: CreateVacancyDto) {
    // Step 1: Create vacancy without `requirements`
    const createdVacancy = await this.prisma.vacancy.create({
      data: {
        ...createVacancyDto,
        requirements: [], // Initially empty
      },
    });

    try {
      // Step 2: Send description to API
      const url = 'http://127.0.0.1:8000/extract-job-skills/';
      const requestBody = { job_description: createVacancyDto.description };
      const response = await lastValueFrom(
        this.httpService.post(url, requestBody),
      );
      console.log(response.data);
      const extractedSkills = response.data || [];

      // Step 3: Update the vacancy with extracted skills
      await this.prisma.vacancy.update({
        where: { id: createdVacancy.id },
        data: { requirements: extractedSkills },
      });
    } catch (error) {
      throw new HttpException(
        `Error while extracting job skills: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return createdVacancy;
  }

  async getAllVacancies() {
    return this.prisma.vacancy.findMany({
      where: { status: VacancyStatus.open },
      include: { Company: true },
    });
  }

  //
  async getVacancyById(id: string) {
    return this.prisma.vacancy.findUnique({
      where: { id },
      include: {
        Company: {
          include: {
            employees: true, // Include users who work in that company
          },
        },
      },
    });
  }
  async updateVacancy(id: string, updateVacancyDto: UpdateVacancyDto) {
    return this.prisma.vacancy.update({
      where: { id },
      data: updateVacancyDto,
    });
  }

  async deleteVacancy(id: string) {
    return this.prisma.vacancy.delete({
      where: { id },
    });
  }
}
