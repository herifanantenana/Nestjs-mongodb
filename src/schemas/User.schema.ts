import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserSettings } from './userSettings.schema';

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  avatarUrl: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserSettings',
    require: false,
  })
  settings?: UserSettings;
}

export const UserSchema = SchemaFactory.createForClass(User);
