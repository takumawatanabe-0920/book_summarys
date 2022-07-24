import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import * as mongoose from 'mongoose';
const MongooseSchema = mongoose.Schema;
export type NotificationDocument = Notification & Document;
export const notificationTypes = ['summaryComment', 'favorite'] as const;
@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  targetUser: User;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    refPath: 'reference',
    required: true,
  })
  item: string;

  @Prop({ type: String, required: true, enum: notificationTypes })
  reference: string;

  @Prop({ type: Boolean, default: false })
  isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
