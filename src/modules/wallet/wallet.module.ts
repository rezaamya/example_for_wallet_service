import { Module } from '@nestjs/common';
import { WalletController } from './controllers/wallet.controller';
import { TransactionsWalletService } from './services/transactions.wallet.service';
import { TransactionModel } from './models/transaction.model';
import { TransactionAnalyticsService } from './services/transaction-analytics.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [WalletController],
  providers: [
    TransactionsWalletService,
    TransactionModel,
    TransactionAnalyticsService,
  ],
  exports: [],
})
export class WalletModule {}
