import { IsNotEmpty, IsNumber } from 'class-validator';

export class WalletBalanceRequestQueryParamsDto {
  @IsNotEmpty()
  user_id: number;
}

export class WalletBalanceResponseDto {
  @IsNumber()
  balance: number;
}

export class WalletMoneyRequestDto {
  @IsNumber()
  user_id: number;
  @IsNumber()
  amount: number;
}

export class WalletMoneyResponseDto {
  @IsNumber()
  reference_id: number;
}
