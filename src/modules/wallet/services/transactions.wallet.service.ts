import { Injectable, Logger } from '@nestjs/common';
import { TransactionModel } from '../models/transaction.model';
import { handleError } from '../../../exceptions/microservice.excepction';

@Injectable()
export class TransactionsWalletService {
  private readonly logger = new Logger(TransactionsWalletService.name);

  constructor(private readonly transactionModel: TransactionModel) {}
  public async walletBalance(user_id: number): Promise<number> {
    try {
      const latestTransaction =
        await this.transactionModel.findLatestByUserId(user_id);
      return latestTransaction?.balance || 0;
    } catch (e) {
      handleError(
        e,
        this.logger,
        `Getting walletBalance failed with following error: ${e.message}`,
        'EXC_Wallet_TransactionsWalletService_WalletBalance_Unknown',
      );
    }
  }

  public async addOrSubtractMoney(
    user_id: number,
    amount: number,
  ): Promise<number> {
    try {
      //TODO
      // Should we throw error if subtraction will result a minus balance?
      const addedTransaction = await this.transactionModel.insertOne(
        user_id,
        amount,
      );

      this.logger.log(
        `transaction added -> reference_id: ${addedTransaction.reference_id} | amount: ${addedTransaction.amount} | balance: ${addedTransaction.balance} | created_at: ${addedTransaction.created_at}`,
      );
      return addedTransaction.reference_id;
    } catch (e) {
      handleError(
        e,
        this.logger,
        `Adding transaction failed with following message: ${e.message}`,
        'EXC_Wallet_TransactionsWalletService_AddOrSubtractMoney_Unknown',
      );
    }
  }
}
