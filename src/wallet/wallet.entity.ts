//wallet entity
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.entity';

@Schema()
export class Wallet extends Document {
  @Prop()
  balance: number;

  @Prop()
  reference: string;

  @Prop()
  previous_balance: number;

  @Prop({ type: User })
  user: User;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
