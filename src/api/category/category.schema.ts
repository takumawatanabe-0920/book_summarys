import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  slug: string;

  @Prop({ type: Number })
  display_order: number;

  @Prop({ type: String })
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
