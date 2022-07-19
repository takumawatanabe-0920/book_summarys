import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';
import { Summary } from '../summary/summary.schema';
export type BrowsingDocument = Browsing & Document;

@Schema({ timestamps: true })
export class Browsing {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Summary' })
  summary: Summary;
}

export const BrowsingSchema = SchemaFactory.createForClass(Browsing);
