import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDTO } from './user.dto';

export type User = any;
@Injectable()
export class UserApplication {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getOne(
    conditions: Partial<UserDTO>,
  ): Promise<ReturnType<UserRepository['getById']>> {
    try {
      return await this.userRepository.getOne(conditions);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async list(): Promise<ReturnType<UserRepository['list']>> {
    try {
      return await this.userRepository.list();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async get(id: string): Promise<ReturnType<UserRepository['getById']>> {
    try {
      return await this.userRepository.getById(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(body: UserDTO): Promise<ReturnType<UserRepository['create']>> {
    try {
      return await this.userRepository.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(
    id: string,
    body: UserDTO,
  ): Promise<ReturnType<UserRepository['update']>> {
    try {
      return await this.userRepository.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: string): Promise<ReturnType<UserRepository['update']>> {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
