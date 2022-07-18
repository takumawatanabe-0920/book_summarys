import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SummaryCommentDocument = SummaryComment & Document;

@Schema({ timestamps: true })
export class SummaryComment {
  // ex.
  // @Prop({ type: String, required: true })
  // name: string;
}

export const SummaryCommentSchema =
  SchemaFactory.createForClass(SummaryComment);
