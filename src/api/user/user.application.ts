import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDTO } from './user.dto';

@Injectable()
export class UserApplication {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async index(): Promise<ReturnType<UserRepository['findAll']>> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async show(id: string): Promise<ReturnType<UserRepository['findById']>> {
    try {
      return await this.userRepository.findById(id);
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
