import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);

  await app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, // throw error when whitelist property is found
      whitelist: true, // detect property outside dto
      transform: true, // instance of Dto
    }),
  );

  const options = new DocumentBuilder()
    .setTitle(process.env.API_TITLE)
    .setDescription(process.env.API_DESCRIPTION)
    .setVersion(process.env.API_VERSION)
    .addTag(process.env.API_TAG)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix(process.env.API_VERSION);

  await app
    .listen(3000)
    .then(() =>
      console.log(
        `HTTP Server is listening on port ${process.env.HTTP_PORT}...`,
        'Bootstrap',
      ),
    );
}
bootstrap();
