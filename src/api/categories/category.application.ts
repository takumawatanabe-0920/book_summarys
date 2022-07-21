import { Injectable, Inject } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryDTO } from './category.dto';

@Injectable()
export class CategoryApplication {
  constructor(
    @Inject(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async index(): Promise<ReturnType<CategoryRepository['findAll']>> {
    try {
      return await this.categoryRepository.findAll();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async show(id: string): Promise<ReturnType<CategoryRepository['findById']>> {
    try {
      return await this.categoryRepository.findById(id);
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
