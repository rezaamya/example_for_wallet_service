import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsWalletService {
  public async walletBalance(user_id: number): Promise<number> {
    try {
      return 4000;
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
      return 123123123;
    } catch (e) {
      //Todo
      // Handle Error
    }
  }
}
