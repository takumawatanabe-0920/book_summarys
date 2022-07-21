import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';
import { CategoryDTO } from './category.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().lean();
  }

  async findById(id: string): Promise<Category> {
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
