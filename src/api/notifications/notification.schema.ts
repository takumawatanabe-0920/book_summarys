import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import * as mongoose from 'mongoose';
const MongooseSchema = mongoose.Schema;
export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  targetUser: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, refPath: 'reference' })
  item: string;

  @Prop({ type: String, required: true })
  reference: string;

  @Prop({ type: Boolean, default: false })
  isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
