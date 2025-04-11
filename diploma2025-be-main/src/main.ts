import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './setup-swagger';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  console.log('Initializing the NestJS application...');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const appUrl = process.env.APP_URL || 'http://localhost:3000';
  const parsedUrl = new URL(appUrl);
  const host = parsedUrl.hostname;
  const port = parsedUrl.port || 3000;

  await app.listen(port, host);
  console.log(`Application is running on: ${parsedUrl.href}`);
}
bootstrap();
