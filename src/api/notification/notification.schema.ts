import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  // ex.
  // @Prop({ type: String, required: true })
  // name: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
