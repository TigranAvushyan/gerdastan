import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { STATIC_ASSETS_PATH } from './consts/staticAssetsPath';
import * as process from 'process';

function createSwagger(app: INestApplication) {
  const options = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(path.join(__dirname, `../${STATIC_ASSETS_PATH}`));

  app.setGlobalPrefix('api');

  if (!process.env.SWAGGER_ENABLE || process.env.SWAGGER_ENABLE === 'true') {
    createSwagger(app);
  }

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
