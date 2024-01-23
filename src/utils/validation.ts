import { IsNumber, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsNumber()
  balance: number;

  @IsString()
  reference: string;
}
