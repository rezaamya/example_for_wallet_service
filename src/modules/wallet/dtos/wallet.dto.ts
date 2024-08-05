import { IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { Transform } from 'class-transformer';

export class WalletBalanceRequestQueryParamsDto {
  @IsNotEmpty()
  @Validate((value: string): boolean => {
    const parsedValue = parseInt(value, 10);
    return !isNaN(parsedValue);
  })
  @Transform(({ value }) => parseInt(value))
  user_id: number;
}

export class WalletBalanceResponseDto {
  @IsNumber()
  balance: number;
}

export class WalletMoneyRequestDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

export class WalletMoneyResponseDto {
  @IsNumber()
  reference_id: number;
}
