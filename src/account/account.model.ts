import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Account extends Document {
  @Prop({ unique: true, required: true })
  accountNo: string;

  @Prop({
    required: true,
    enum: ['savings', 'current', 'fixed deposit'],
    default: 'savings',
  })
  accountType: string;

  @Prop({ default: 0 })
  accountBalance: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  accountOwner: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
export interface Account extends Document {
  accountNo: string;
  accountType: string;
  accountBalance: number;
  accountOwner: string;
}
