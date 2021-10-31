import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionFilter } from './utils/all-exception.filter';
import { LoggerAddon } from './utils/logger';
import env from './utils/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // app.useLogger(new LoggerAddon(configService));
  app.useGlobalFilters(new AllExceptionFilter());
  app.enableCors();
  
  // Swagger
  const options = new DocumentBuilder()
    .setTitle('PROJECT')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(process.env.PORT || env.PORT);
}
bootstrap();
