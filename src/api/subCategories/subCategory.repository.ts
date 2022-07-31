import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SubCategory, SubCategoryDocument } from './subCategory.schema';
import { SubCategoryDTO } from './subCategory.dto';
import { PaginationOptions } from '../../config/mongoOption';
import { getPaginationQuery } from '../../config/lib/repositories';

@Injectable()
export class SubCategoryRepository {
  constructor(
    @InjectModel(SubCategory.name)
    private readonly subCategoryModel: Model<SubCategoryDocument>,
  ) {}

  async list(
    condition: Partial<SubCategoryDTO> = {},
    option: PaginationOptions,
  ): Promise<SubCategory[]> {
    const query = getPaginationQuery(
      this.subCategoryModel.find(condition),
      option,
    );
    return await query.exec();
  }

  async getById(id: string): Promise<SubCategory> {
    return await this.subCategoryModel.findById(id).lean();
  }

  async create(subCategory: SubCategoryDTO): Promise<SubCategory> {
    const createdSubCategory = new this.subCategoryModel(subCategory);
    return createdSubCategory.save();
  }

  async update(id: string, subCategory: SubCategoryDTO): Promise<SubCategory> {
    return await this.subCategoryModel.findByIdAndUpdate(id, subCategory, {
      new: true,
    });
  }

  async delete(id: string): Promise<SubCategory> {
    return await this.subCategoryModel.findByIdAndRemove(id);
  }
}
