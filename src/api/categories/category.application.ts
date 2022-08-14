import { Injectable, Inject } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryDTO } from './category.dto';
import { S3 } from 'src/api/lib/aws';
import { categories } from 'src/config/data/category';
@Injectable()
export class CategoryApplication {
  constructor(
    @Inject(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async list(): Promise<(typeof categories[number] & { image: string })[]> {
    try {
      return await Promise.all(
        categories.map(async (category) => {
          const imageUrl = await S3.getSignedUrl({
            key: category.imageKey,
            method: 'getObject',
          });
          return {
            ...category,
            image: imageUrl,
          };
        }),
      );
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
