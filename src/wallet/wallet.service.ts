// wallet.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletDocument } from './wallet.entity';
import { CreateWalletDto } from '../utils/validation';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<WalletDocument>,
  ) {}

  async createForUser(
    userId: string,

    wallet: CreateWalletDto,
  ): Promise<Wallet> {
    try {
      console.log('starting wallet');

      const createdWallet = new this.walletModel({ ...wallet, user: userId });
      // show user name also in response and save it in database also

      console.log('wallet created');
      return await createdWallet.save();
    } catch (error) {
      console.error(`Error creating wallet: ${error.message}`);
      throw new Error('An error occurred while creating the wallet.');
    }
  }

  async findById(id: string): Promise<Wallet> {
    try {
      const wallet = await this.walletModel.findById(id).exec();
      if (!wallet) {
        throw new NotFoundException('Wallet not found');
      }
      return wallet;
    } catch (error) {
      console.error(`Error finding wallet by ID: ${error.message}`);
      throw new Error('An error occurred while finding the wallet.');
    }
  }

  async fundWallet(userId: string, amount: number): Promise<Wallet> {
    try {
      const wallet = await this.walletModel.findOne({ user: userId }).exec();

      if (!wallet) {
        throw new NotFoundException('Wallet not found for the user');
      }

      wallet.balance += amount;
      wallet.previous_balance = wallet.balance;
      console.log('wallet.balance', wallet.balance);

      return await wallet.save();
    } catch (error) {
      throw new Error(`Error funding wallet: ${error.message}`);
    }
  }

  async transferFunds(
    senderWalletId: string,
    receiverWalletId: string,
    amount: number,
  ): Promise<void> {
    const session = await this.walletModel.startSession();

    try {
      await session.withTransaction(async () => {
        const senderWallet = await this.walletModel
          .findById(senderWalletId)
          .session(session);
        const receiverWallet = await this.walletModel
          .findById(receiverWalletId)
          .session(session);

        if (!senderWallet || !receiverWallet) {
          throw new NotFoundException('Sender or receiver wallet not found');
        }

        if (amount <= 0) {
          throw new BadRequestException('Amount must be a positive value');
        }

        if (senderWallet.balance < amount) {
          throw new BadRequestException('Insufficient funds');
        }

        senderWallet.balance -= amount;
        senderWallet.previous_balance = senderWallet.balance;
        await senderWallet.save();

        receiverWallet.balance += amount;
        receiverWallet.previous_balance = receiverWallet.balance;
        console.log('receiverWallet.balance', receiverWallet.balance);
        return await receiverWallet.save();
      });
    } catch (error) {
      console.error(`Error transferring funds: ${error.message}`);
      throw new Error('An error occurred while transferring funds.');
    } finally {
      session.endSession();
    }
  }
}
