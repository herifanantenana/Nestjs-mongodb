import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserSettings {
  @Prop({ required: false })
  receiveNotification?: boolean;

  @Prop({ required: false })
  darkMode?: boolean;

  @Prop({ required: false })
  receiceEmails?: boolean;

  @Prop({ required: false })
  receiveSMS?: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
