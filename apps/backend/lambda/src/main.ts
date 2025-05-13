import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  const configService = app.get(ConfigService);

  const port = configService.get<number>('app.port')!;

  await app.listen(port);
}
bootstrap();
