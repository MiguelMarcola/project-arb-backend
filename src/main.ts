import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigSwagger } from './config/swagger';
import { AllExceptionsFilter } from './filters/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  new ConfigSwagger(app).createDocument();

  const config = app.get(ConfigService);
  const port = config.get('app.port');

  app.enableCors({});
  const server = await app.listen(port, '0.0.0.0');

  server.setTimeout(60000);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
