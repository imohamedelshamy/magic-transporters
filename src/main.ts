import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { LogService } from './common/logging/logger.service';
import { LoggingInterceptor } from './common/logging/logger.interceptor';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const logger = app.get(LogService);
  app.useLogger(app.get(logger.constructor));

  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  /**
   * This middleware is used to enable the CORS for the application
   */
  app.enableCors();

  /**
   * This pipe is used to validate the DTOs
   */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  /**
   * This is the swagger configuration for the API documentation generation and display on the browser at /docs route
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Magic Transporters')
    .setDescription('Magic Transporters API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('apis', app, document);

  await app.listen(configService.get('PORT'));
}

bootstrap();
