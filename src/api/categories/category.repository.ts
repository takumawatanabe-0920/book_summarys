import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';
import { CategoryDTO } from './category.dto';
import { PaginationOptions } from '../../config/mongoOption';
import { getPaginationQuery } from '../../config/lib/repositories';
@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async list(option: PaginationOptions): Promise<Category[]> {
    const query = getPaginationQuery(this.categoryModel.find(), option);
    return await query.exec();
  }

  async getById(id: string): Promise<Category> {
    return this.categoryModel.findById(id).lean();
  }

  async create(category: CategoryDTO): Promise<Category> {
    const createdCategory = new this.categoryModel(category);
    return createdCategory.save();
  }

  async update(id: string, category: CategoryDTO): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(id, category);
  }

  async delete(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndRemove(id);
  }
}
