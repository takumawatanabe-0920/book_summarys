import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Summary, SummaryDocument } from './summary.schema';
import { SummaryDTO, CreateSummaryDTO, UpdateSummaryDTO } from './summary.dto';
import { PaginationOptions, repositories } from '../../config/mongoOption';
import { getPaginationQuery } from '../../config/lib/repositories';
import { UpdateBody } from '../../types/mongoose';
import { categories } from 'src/config/data/category';
import { subCategories } from 'src/config/data/subCategory';
@Injectable()
export class SummaryRepository {
  constructor(
    @InjectModel(Summary.name)
    private readonly summaryModel: Model<SummaryDocument>,
  ) {}

  async list(
    conditions: Partial<SummaryDTO>,
    option: PaginationOptions,
  ): Promise<
    (Summary &
      Omit<Summary, 'category' | 'subCategory'> & {
        category: Partial<typeof categories[number]>;
        subCategory: Partial<typeof subCategories[number]>;
      })[]
  > {
    const query = getPaginationQuery(
      this.summaryModel
        .find({ ...conditions })
        .populate('user')
        .lean(),
      option,
    );
    const summaries = await query.exec();
    for (const summary of summaries) {
      if (summary?.category) {
        const category = categories.find((c) => c.id === summary.category);
        summary.category = category;
      }
      if (summary?.subCategory) {
        const subCategory = subCategories.find(
          (c) => c.id === summary.subCategory,
        );
        summary.subCategory = subCategory;
      }
    }
    return summaries;
  }

  async count(conditions: Partial<SummaryDTO> = {}): Promise<number> {
    return await this.summaryModel.countDocuments(conditions);
  }

  async getById(
    id: string,
    option: repositories.BaseOptions = {},
  ): Promise<
    Omit<Summary, 'category' | 'subCategory'> & {
      category: Partial<typeof categories[number]>;
      subCategory: Partial<typeof subCategories[number]>;
    }
  > {
    console.log({ id });
    const summary = (
      await this.summaryModel.findById(id, option).populate('user')
    )?.toJSON() as Omit<Summary, 'category' | 'subCategory'> & {
      category: Partial<typeof categories[number]>;
      subCategory: Partial<typeof subCategories[number]>;
    };
    if (summary?.category) {
      const category = categories.find((c) => c.id === summary.category);
      summary.category = category;
    }
    if (summary?.subCategory) {
      const subCategory = subCategories.find(
        (c) => c.id === summary.subCategory,
      );
      summary.subCategory = subCategory;
    }
    return summary;
  }

  async create(summary: CreateSummaryDTO): Promise<Summary> {
    const createdSummary = new this.summaryModel(summary);
    return createdSummary.save();
  }

  async update(
    id: string,
    summary: UpdateBody<any> | UpdateSummaryDTO,
    option: repositories.BaseOptions = {},
  ): Promise<Summary> {
    return await this.summaryModel.findByIdAndUpdate(id, summary, {
      ...option,
      new: true,
    });
  }

  async delete(
    id: string,
    option?: repositories.BaseOptions,
  ): Promise<Summary> {
    return await this.summaryModel.findByIdAndRemove(id, option);
  }
}
