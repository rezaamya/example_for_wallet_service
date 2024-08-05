import { Module } from '@nestjs/common';
import { WalletController } from './controllers/wallet.controller';
import { TransactionsWalletService } from './services/transactions.wallet.service';
import { TransactionModel } from './models/transaction.model';

@Module({
  controllers: [WalletController],
  providers: [TransactionsWalletService, TransactionModel],
  imports: [],
  exports: [],
})
export class WalletModule {}
