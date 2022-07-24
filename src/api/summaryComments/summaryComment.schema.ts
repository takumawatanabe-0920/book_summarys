import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import { Summary } from '../summaries/summary.schema';
import * as mongoose from 'mongoose';
export type SummaryCommentDocument = SummaryComment & Document;

@Schema({ timestamps: true })
export class SummaryComment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Summary',
    required: true,
  })
  summary: Summary;

  @Prop({ type: String, required: true })
  comment: string;
}

export const SummaryCommentSchema =
  SchemaFactory.createForClass(SummaryComment);
