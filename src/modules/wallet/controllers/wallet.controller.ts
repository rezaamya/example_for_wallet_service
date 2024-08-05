import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  WalletBalanceRequestQueryParamsDto,
  WalletBalanceResponseDto,
  WalletMoneyRequestDto,
  WalletMoneyResponseDto,
} from '../dtos/wallet.dto';
import { TransactionsWalletService } from '../services/transactions.wallet.service';

@Controller('v1')
export class WalletController {
  constructor(
    private readonly transactionsWalletService: TransactionsWalletService,
  ) {}

  @Get('balance')
  async walletBalance(
    @Query() queryParams: WalletBalanceRequestQueryParamsDto,
  ): Promise<WalletBalanceResponseDto> {
    const latestBalance = await this.transactionsWalletService.walletBalance(
      queryParams.user_id,
    );

    return { balance: latestBalance };
  }

  @Post('money')
  async money(
    @Body() body: WalletMoneyRequestDto,
  ): Promise<WalletMoneyResponseDto> {
    const transactionId =
      await this.transactionsWalletService.addOrSubtractMoney(
        body.user_id,
        body.amount,
      );

    return {
      reference_id: transactionId,
    };
  }
}
