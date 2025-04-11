import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Job Connect API')
    .setDescription(
      'API documentation for handling user authentication, job vacancies, applications, and user management.',
    )
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Users')
    .addTag('Vacancies')
    .addTag('Applications')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
