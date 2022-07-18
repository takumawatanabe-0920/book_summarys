import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SummaryDocument = Summary & Document;

@Schema({ timestamps: true })
export class Summary {
  // ex.
  // @Prop({ type: String, required: true })
  // name: string;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
