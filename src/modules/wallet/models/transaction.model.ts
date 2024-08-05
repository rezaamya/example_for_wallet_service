import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { Transaction } from '../types/wallet.type';
import { handleError } from '../../../exceptions/microservice.excepction';

@Injectable()
export class TransactionModel {
  private readonly logger = new Logger(TransactionModel.name);

  constructor(@Inject('PG') private readonly Pool: Pool) {}

  public async findLatestByUserId(user_id: number): Promise<Transaction> {
    try {
      const result = await this.Pool.query(
        `select * from transactions where user_id = $1 order by created_at DESC LIMIT 1;`,
        [user_id],
      );

      return result.rows[0];
    } catch (e) {
      handleError(
        e,
        this.logger,
        `findLatestByUserId failed with following error: ${e.message}`,
        'EXC_Wallet_TransactionModel_FindLatestByUserId_Unknown',
      );
    }
  }

  public async insertOne(
    user_id: number,
    amount: number,
  ): Promise<Transaction> {
    try {
      const latestTransaction = await this.findLatestByUserId(user_id);
      const lastBalance = latestTransaction?.balance || 0;
      const newBalance = lastBalance + amount;

      const result = await this.Pool.query(
        `insert into transactions (user_id, amount, balance) values ($1, $2, $3) returning *;`,
        [user_id, amount, newBalance],
      );
      return result.rows[0];
    } catch (e) {
      handleError(
        e,
        this.logger,
        `insertOne failed with following error: ${e.message}`,
        'EXC_Wallet_TransactionModel_InsertOne_Unknown',
      );
    }
  }

  public async getTotalAmountBetweenDates(
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    try {
      //TODO:
      // Should we remove 'ABS' from following query?
      const result = await this.Pool.query(
        `SELECT SUM(ABS(amount)) as total_amount FROM transactions WHERE created_at >= $1 AND created_at < $2;`,
        [startDate, endDate],
      );
      return result.rows[0].total_amount || 0;
    } catch (e) {
      handleError(
        e,
        this.logger,
        `getTotalAmountBetweenDates failed with following error: ${e.message}`,
        'EXC_Wallet_TransactionModel_GetTotalAmountBetweenDates_Unknown',
      );
    }
  }
}
