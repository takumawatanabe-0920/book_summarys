import { Injectable, Inject } from '@nestjs/common';
import { SubCategoryRepository } from './subCategory.repository';
import { SubCategoryDTO } from './subCategory.dto';
import { PaginationOptions } from '../../config/mongoOption';
@Injectable()
export class SubCategoryApplication {
  constructor(
    @Inject(SubCategoryRepository)
    private subCategoryRepository: SubCategoryRepository,
  ) {}

  async list(
    option: PaginationOptions,
  ): Promise<ReturnType<SubCategoryRepository['list']>> {
    try {
      return await this.subCategoryRepository.list(option);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async get(id: string): Promise<ReturnType<SubCategoryRepository['getById']>> {
    try {
      return await this.subCategoryRepository.getById(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(
    body: SubCategoryDTO,
  ): Promise<ReturnType<SubCategoryRepository['create']>> {
    try {
      return await this.subCategoryRepository.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(
    id: string,
    body: SubCategoryDTO,
  ): Promise<ReturnType<SubCategoryRepository['update']>> {
    try {
      return await this.subCategoryRepository.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(
    id: string,
  ): Promise<ReturnType<SubCategoryRepository['update']>> {
    try {
      return await this.subCategoryRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
