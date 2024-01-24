import { IsNumber, IsPositive } from 'class-validator';

export class TransferFundsDto {
  @IsNumber()
  @IsPositive()
  amount: number;
}
