import { Module } from '@nestjs/common';
import { WalletController } from './controllers/wallet.controller';
import { TransactionsWalletService } from './services/transactions.wallet.service';

@Module({
  controllers: [WalletController],
  providers: [TransactionsWalletService],
  imports: [],
  exports: [],
})
export class WalletModule {}
