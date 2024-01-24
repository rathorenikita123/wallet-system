import {
  Controller,
  Param,
  Body,
  Post,
  HttpException,
  HttpStatus,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { TransferFundsDto } from '../utils/amountValidation';
import { Wallet } from './wallet.entity';
import { CreateWalletDto } from 'src/utils/validation';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('users/:userId')
  async createWallet(
    @Param('userId') userId: string,
    @Body() wallet: CreateWalletDto,
  ): Promise<Wallet> {
    try {
      return await this.walletService.createForUser(userId, wallet);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get(':id')
  async getWalletById(@Param('id') id: string): Promise<Wallet> {
    try {
      return await this.walletService.findById(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post('fund/:userId')
  async fundWallet(
    @Param('userId') userId: string,
    @Body('amount') amount: number,
  ): Promise<void> {
    try {
      await this.walletService.fundWallet(userId, amount);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':senderWalletId/transfer/:receiverWalletId')
  async transferFunds(
    @Param('senderWalletId') senderWalletId: string,
    @Param('receiverWalletId') receiverWalletId: string,
    @Body(ValidationPipe) transferDto: TransferFundsDto,
  ): Promise<void> {
    try {
      await this.walletService.transferFunds(
        senderWalletId,
        receiverWalletId,
        transferDto.amount,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
