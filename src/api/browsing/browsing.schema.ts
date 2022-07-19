import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BrowsingDocument = Browsing & Document;

@Schema({ timestamps: true })
export class Browsing {
  // ex.
  // @Prop({ type: String, required: true })
  // name: string;
}

export const BrowsingSchema = SchemaFactory.createForClass(Browsing);
