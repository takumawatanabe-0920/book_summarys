import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SubCategoryDocument = SubCategory & Document;

@Schema({ timestamps: true })
export class SubCategory {
  // ex.
  // @Prop({ type: String, required: true })
  // name: string;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
