import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDTO } from './user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async list(): Promise<User[]> {
    return await this.userModel.find().lean();
  }

  async getById(id: string): Promise<User & { _id: string }> {
    return await this.userModel.findById(id).lean();
  }

  async getOne(conditions: Partial<User>): Promise<User & { _id: string }> {
    return await this.userModel.findOne(conditions).lean();
  }

  async create(user: CreateUserDTO): Promise<User> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async update(id: string, user: Partial<CreateUserDTO>): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }
}
