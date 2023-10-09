import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Transaction extends Document {
  @Prop({ required: true, enum: ['Deposit', 'Withdrawal', 'Transfer'] })
  type: string;

  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ required: true, default: Date.now })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'Account', required: true })
  sourceAccount: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Account' })
  destinationAccount: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
export interface Transaction extends Document {
  type: string;
  amount: number;
  date: Date;
  sourceAccount: Types.ObjectId;
  destinationAccount: Types.ObjectId;
}
