import { Injectable, Logger } from '@nestjs/common';
import { TransactionModel } from '../models/transaction.model';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TransactionAnalyticsService {
  private readonly logger = new Logger(TransactionAnalyticsService.name);

  constructor(private readonly transactionModel: TransactionModel) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async calculateDailyTransactions() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalAmount = await this.transactionModel.getTotalAmountBetweenDates(
      yesterday,
      today,
    );

    this.logger.log(
      `Total amount of transactions processed on ${yesterday.toISOString().split('T')[0]}: ${totalAmount}`,
    );
  }
}
