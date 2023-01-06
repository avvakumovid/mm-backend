import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './../validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidateInputPipe({
    forbidUnknownValues: false
  }))
  app.enableCors();
  await app.listen(4200);

}
bootstrap();
