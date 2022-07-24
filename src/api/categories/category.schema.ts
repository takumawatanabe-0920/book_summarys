import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  slug: string;

  @Prop({ type: Number, default: 0 })
  displayOrder: number;

  @Prop({ type: String })
  image: string;
}

// TODO virtual image

export const CategorySchema = SchemaFactory.createForClass(Category);
