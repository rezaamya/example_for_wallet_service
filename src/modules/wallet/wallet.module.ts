import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WalletController } from './controllers/wallet.controller';
import { TransactionsWalletService } from './services/transactions.wallet.service';
import appConfig from '../../configs/app.config';
import { configValidator } from '../../configs/validator';

@Module({
  controllers: [WalletController],
  providers: [TransactionsWalletService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
      validate: configValidator,
    }),
  ],
  exports: [],
})
export class WalletModule {}
