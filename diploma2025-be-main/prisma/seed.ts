import {
  PrismaClient,
  Role,
  VacancyStatus,
  ApplicationStatus,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';
// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Seed Companies
  const seedCompanies = [
    {
      id: 'ed5f6886-7c05-4ec8-86d2-bf409e3cabdf',
      hhId: '1',
      name: 'Альфа-Банк',
      logoUrls: {
        original: 'https://img.hhcdn.ru/employer-logo-original/663873.png',
        '240': 'https://img.hhcdn.ru/employer-logo/3096625.png',
        '90': 'https://img.hhcdn.ru/employer-logo/3096624.png',
      },
    },
    {
      id: '7ec22d60-6335-4562-9055-6e7dee4bbf25',
      hhId: '2',
      name: 'Astana IT University',
      logoUrls: {
        original: 'https://img.hhcdn.ru/employer-logo-original/780155.jpg',
        '240': 'https://img.hhcdn.ru/employer-logo/3561512.jpeg',
        '90': 'https://img.hhcdn.ru/employer-logo/3561511.jpeg',
      },
    },
  ];

  for (const company of seedCompanies) {
    await prisma.company.upsert({
      where: { id: company.id },
      update: {},
      create: {
        ...company,
        logoUrls: company.logoUrls
          ? JSON.stringify(company.logoUrls)
          : undefined, // Ensure valid JSON or undefined
      },
    });
  }
  // Seed Users
  const seedUsers = [
    {
      id: '17543af5-8900-4fbe-a7a3-bcf3757354b6',
      username: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@admin.com',
      password: 'admin',
      role: Role.admin,
      isEmailVerified: true,
    },
    {
      id: '4edd5631-b648-4638-b8da-bbab4d212669',
      username: 'aibyn',
      firstName: 'Aibyn',
      lastName: 'Talgatov',
      email: 'aibyn@gmail.com',
      password: 'aibyn',
      role: Role.employer,
      companyId: seedCompanies[0].id,
      isEmailVerified: true,
    },
    {
      id: '9d7758a1-26c3-43a2-bbf7-d009ede0a55c',
      username: 'samat',
      firstName: 'Samat',
      lastName: 'Balentbay',
      email: 'samat@gmail.com',
      password: 'samat',
      role: Role.applicant,
      isEmailVerified: true,
    },
  ];

  for (const user of seedUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  // Seed Vacancies
  const seedVacancies = [
    {
      id: '521bf5dd-6f04-4763-89ad-506f2b727deb',
      companyId: seedCompanies[0].id,
      title: 'Software Developer',
      description: 'Looking for a skilled software developer.',
      location: 'New York, NY',
      createdAt: new Date(),
      status: VacancyStatus.open,
      minSalary: '60000',
      maxSalary: '90000',
      type: 'Full-time',
      requirements: ['JavaScript', 'Node.js', 'React'],
    },
    {
      id: 'b41bf736-9a2b-4bff-816a-1092482eb331',
      companyId: seedCompanies[1].id,
      title: 'Business Analyst',
      description: 'Experienced business analyst needed.',
      location: 'San Francisco, CA',
      createdAt: new Date(),
      status: VacancyStatus.open,
      minSalary: '70000',
      maxSalary: '100000',
      type: 'Full-time',
      requirements: ['Data Analysis', 'SQL', 'Communication Skills'],
    },
  ];

  for (const vacancy of seedVacancies) {
    await prisma.vacancy.upsert({
      where: { id: vacancy.id },
      update: {},
      create: vacancy,
    });
  }

  // Seed Vacancy Applications
  const seedApplications = [
    {
      id: '2c6a2e30-30cb-451e-a857-96a78ae2da1b',
      userId: seedUsers[2].id,
      receiverId: seedUsers[1].id,
      vacancyId: seedVacancies[0].id,
      status: ApplicationStatus.pending,
      cv: 'https://example.com/cv.pdf',
      applicationDate: new Date(),
      comment: 'Looking forward to joining your team!',
    },
    {
      id: '35cd7302-107c-4750-aca5-587783d16f70',
      userId: seedUsers[2].id,
      receiverId: seedUsers[1].id,
      vacancyId: seedVacancies[1].id,
      status: ApplicationStatus.pending,
      applicationDate: new Date(),
      cv: 'https://example.com/aibynonelove.pdf',
      comment: 'Eager to bring my analytical skills to your company.',
    },
  ];

  for (const application of seedApplications) {
    await prisma.vacancyApplication.upsert({
      where: { id: application.id },
      update: {},
      create: application,
    });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
