import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  // ex.
  // @Prop({ type: String, required: true })
  // name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
