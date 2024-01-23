// user entity
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop()
  dob: string;

  @Prop()
  phone_number: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
