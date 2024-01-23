import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('starting');
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('yjjjj');
}
bootstrap();
