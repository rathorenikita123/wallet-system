import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.entity';

@Schema()
export class Wallet extends Document {
  @Prop()
  balance: number;

  @Prop()
  reference: string;

  @Prop()
  previous_balance?: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', unique: true })
  user: User;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
export type WalletDocument = Wallet & Document;
