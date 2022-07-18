import { Injectable, Inject } from '@nestjs/common';
import { SubCategoryRepository } from './subCategory.repository';
import { SubCategoryDTO } from './subCategory.dto';

@Injectable()
export class SubCategoryApplication {
  constructor(
    @Inject(SubCategoryRepository)
    private subCategoryRepository: SubCategoryRepository,
  ) {}

  async index(): Promise<ReturnType<SubCategoryRepository['findAll']>> {
    try {
      return await this.subCategoryRepository.findAll();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async show(
    id: string,
  ): Promise<ReturnType<SubCategoryRepository['findById']>> {
    try {
      return await this.subCategoryRepository.findById(id);
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
