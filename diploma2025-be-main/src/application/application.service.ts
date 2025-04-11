import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApplicationService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async createApplication(createApplicationDto: CreateApplicationDto) {
    const vacancy = await this.prisma.vacancy.findUnique({
      where: { id: createApplicationDto.vacancyId },
    });
    if (!vacancy) {
      throw new Error(
        `Vacancy with ID ${createApplicationDto.vacancyId} does not exist.`,
      );
    }
    const userExists = await this.prisma.user.findUnique({
      where: { id: createApplicationDto.userId },
    });

    if (!userExists) {
      throw new Error(
        `User with ID ${createApplicationDto.vacancyId} does not exist.`,
      );
    }
    const receiverExists = await this.prisma.user.findUnique({
      where: { id: createApplicationDto.receiverId },
    });
    if (!receiverExists) {
      throw new Error(
        `Receiver with ID ${createApplicationDto.receiverId} does not exist.`,
      );
    }
    const application = await this.prisma.vacancyApplication.create({
      data: {
        userId: createApplicationDto.userId,
        vacancyId: createApplicationDto.vacancyId,
        receiverId: createApplicationDto.receiverId,
        status: createApplicationDto.status,
        comment: createApplicationDto.comment,
        cv: userExists.cv,

        applicationDate: new Date(),
      },
    });

    console.log(application.cv, vacancy.requirements);
    const matchResult = await this.matchSkills(
      application.cv,
      vacancy.requirements,
    );
    return this.prisma.vacancyApplication.update({
      where: { id: application.id },
      data: {
        extractedSkills: matchResult.extracted_skills,
        comparisonResult: matchResult.comparison_result,
        matchPercentage: matchResult.Percentage,
      },
    });
  }

  async getAllApplications() {
    return this.prisma.vacancyApplication.findMany({
      include: { User: true, Vacancy: true },
    });
  }

  async getApplicationById(id: string) {
    return this.prisma.vacancyApplication.findUnique({
      where: { id },
      include: { User: true, Vacancy: true },
    });
  }

  async updateApplication(
    id: string,
    updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.prisma.vacancyApplication.update({
      where: { id },
      data: updateApplicationDto,
    });
  }

  async deleteApplication(id: string) {
    return this.prisma.vacancyApplication.delete({
      where: { id },
    });
  }

  async matchSkills(pdfUrl: string, jobRequirements: string[]) {
    const url = 'http://127.0.0.1:8000/match-skills/';
    const requestBody = {
      pdf_url: pdfUrl,
      job_requirements: jobRequirements,
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, requestBody),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Error while matching skills: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
