import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';
import { Favorite } from '../favorites/favorite.schema';
import { S3 } from 'src/api/lib/aws';
export const publishingStatuses = ['private', 'public'] as const;

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

  @Prop({ type: String, enum: publishingStatuses })
  publishingStatus: string;

  @Prop({ type: String })
  imageKey: string;

  @Prop({ type: String })
  category: string;

  @Prop({ type: String })
  subCategory: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorite' }],
    default: [],
  })
  favorites: (Favorite | string)[];

  async getImageFullPath() {
    if (!this.imageKey) {
      return null;
    }
    const imageUrl = await S3.getSignedUrl({
      key: this.imageKey,
      method: 'getObject',
    });
    return imageUrl;
  }
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
SummarySchema.loadClass(Summary);
