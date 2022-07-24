import { Injectable, Inject } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryDTO } from './category.dto';
import { PaginationOptions } from '../../config/mongoOption';
@Injectable()
export class CategoryApplication {
  constructor(
    @Inject(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async list(
    option: PaginationOptions,
  ): Promise<ReturnType<CategoryRepository['list']>> {
    try {
      return await this.categoryRepository.list(option);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async get(id: string): Promise<ReturnType<CategoryRepository['getById']>> {
    try {
      return await this.categoryRepository.getById(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(
    body: CategoryDTO,
  ): Promise<ReturnType<CategoryRepository['create']>> {
    try {
      return await this.categoryRepository.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(
    id: string,
    body: CategoryDTO,
  ): Promise<ReturnType<CategoryRepository['update']>> {
    try {
      return await this.categoryRepository.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: string): Promise<ReturnType<CategoryRepository['update']>> {
    try {
      return await this.categoryRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
