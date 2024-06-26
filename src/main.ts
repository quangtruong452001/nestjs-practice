import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3002;
  app.enableCors({ origin: '*' });
  console.log(`Server running on http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
