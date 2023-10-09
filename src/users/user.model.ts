import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ unique: true, required: true }) // Use the 'unique' property
  email: string;

  @Prop({ unique: true, required: true }) // Use the 'unique' property
  phoneNo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export interface User extends Document {
  username: string;
  password: string;
  email: string;
  phoneNo: string;
}
