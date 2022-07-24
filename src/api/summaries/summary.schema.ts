import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';
import { Category } from '../categories/category.schema';
import { SubCategory } from '../subCategories/subCategory.schema';
import { Favorite } from '../favorites/favorite.schema';

export const publishingStatuses = ['draft', 'published'] as const;

export type SummaryDocument = Summary & Document;

@Schema({ timestamps: true })
export class Summary {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  bookName: string;

  @Prop({ type: String })
  content: string;

  @Prop({ type: String })
  discription: string;

  @Prop({ type: String })
  thumbnail: string;

  @Prop({ type: String, enum: publishingStatuses })
  publishingStatus: string;

  @Prop({ type: String })
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' })
  subCategory: SubCategory;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorite' }],
    default: [],
  })
  favorites: (Favorite | string)[];
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
