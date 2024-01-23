import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class TransferFundsDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNumber()
  @IsOptional()
  balance?: number;

  @IsOptional()
  reference?: string;
}
