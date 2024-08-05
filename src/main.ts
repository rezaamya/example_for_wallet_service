import { NestFactory } from '@nestjs/core';
import { WalletModule } from './modules/wallet/wallet.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from './configs/app.config';

async function bootstrap() {
  const app = await NestFactory.create(WalletModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const configService = app.get<ConfigService>(ConfigService);
  const appConfig = configService.get<IAppConfig>('app');

  await app.listen(appConfig.port);
}
bootstrap();
