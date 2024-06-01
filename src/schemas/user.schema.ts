import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserSettings } from './userSettings.schema';
import { Post } from './post.schema';

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
    ref: UserSettings.name,
    require: false,
  })
  settings?: UserSettings;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Post.name }],
  })
  posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
