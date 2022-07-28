import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  displayName: string;

  @Prop({ type: String, required: true })
  photoURL: string;

  @Prop({ type: String, required: true })
  token: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
