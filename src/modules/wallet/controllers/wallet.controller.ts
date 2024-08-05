import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Query,
} from '@nestjs/common';
import {
  WalletBalanceRequestQueryParamsDto,
  WalletBalanceResponseDto,
  WalletMoneyRequestDto,
  WalletMoneyResponseDto,
} from '../dtos/wallet.dto';
import { TransactionsWalletService } from '../services/transactions.wallet.service';
import { handleError } from '../../../exceptions/microservice.excepction';

@Controller('v1')
export class WalletController {
  private readonly logger = new Logger(WalletController.name);

  constructor(
    private readonly transactionsWalletService: TransactionsWalletService,
  ) {}

  @Get('balance')
  async walletBalance(
    @Query() queryParams: WalletBalanceRequestQueryParamsDto,
  ): Promise<WalletBalanceResponseDto> {
    try {
      const latestBalance = await this.transactionsWalletService.walletBalance(
        queryParams.user_id,
      );

      return { balance: latestBalance };
    } catch (e) {
      handleError(
        e,
        this.logger,
        `getting walletBalance failed with following error: ${e.message}`,
        'Failed to get balance.',
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('money')
  async money(
    @Body() body: WalletMoneyRequestDto,
  ): Promise<WalletMoneyResponseDto> {
    try {
      const transactionId =
        await this.transactionsWalletService.addOrSubtractMoney(
          body.user_id,
          body.amount,
        );

      return {
        reference_id: transactionId,
      };
    } catch (e) {
      handleError(
        e,
        this.logger,
        `Add or subtract money failed with following error: ${e.message}`,
        'Failed to add or subtract money.',
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
