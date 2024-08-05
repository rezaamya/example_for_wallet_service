import { Injectable } from '@nestjs/common';
import { TransactionModel } from '../models/transaction.model';

@Injectable()
export class TransactionsWalletService {
  constructor(private readonly transactionModel: TransactionModel) {}
  public async walletBalance(user_id: number): Promise<number> {
    try {
      const latestTransaction =
        await this.transactionModel.findLatestByUserId(user_id);
      return latestTransaction?.balance || 0;
    } catch (e) {
      //Todo
      // Handle Error
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
      return addedTransaction.reference_id;
    } catch (e) {
      //Todo
      // Handle Error
    }
  }
}
