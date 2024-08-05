import { Module } from '@nestjs/common';
import { WalletModule } from './modules/wallet/wallet.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './configs/app.config';
import postgresConfig from './configs/postgres.config';
import { configValidator } from './configs/validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, postgresConfig],
      validate: configValidator,
    }),
    WalletModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
