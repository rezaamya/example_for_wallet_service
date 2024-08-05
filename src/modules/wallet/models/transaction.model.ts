import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { Transaction } from '../types/wallet.type';

@Injectable()
export class TransactionModel {
  constructor(@Inject('PG') private readonly Pool: Pool) {}

  public async findLatestByUserId(user_id: number): Promise<Transaction> {
    try {
      const result = await this.Pool.query(
        `select * from transactions where user_id = $1 order by created_at DESC LIMIT 1;`,
        [user_id],
      );
      return result.rows[0];
    } catch (e) {
      //Todo
      // Handle Error
      throw new Error('EXC_Wallet_TransactionModel_FindLatestByUserId_Unknown');
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
      //Todo
      // Handle Error
      throw new Error('EXC_Wallet_TransactionModel_InsertOne_Unknown');
    }
  }
}
