import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { UserDTO } from './user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async list(): Promise<User[]> {
    return this.userModel.find().lean();
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id).lean();
  }

  async getOne(conditions: Partial<User>): Promise<User> {
    return this.userModel.findOne(conditions).lean();
  }

  async create(user: UserDTO): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async update(id: string, user: UserDTO): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user);
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id);
  }
}
