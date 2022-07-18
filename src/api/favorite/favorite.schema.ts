import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FavoriteDocument = Favorite & Document;

@Schema({ timestamps: true })
export class Favorite {
  // ex.
  // @Prop({ type: String, required: true })
  // name: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
