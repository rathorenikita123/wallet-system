import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  address: string;

  @Prop()
  dob: string;

  @Prop({ unique: true })
  phone_number: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
