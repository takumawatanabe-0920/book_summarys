import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserApplication } from './user.application';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserApplication, UserRepository],
  exports: [UserApplication],
})
export class UserModule {}
