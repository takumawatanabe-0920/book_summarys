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
        image: string;
      })[]
  > {
    const query = getPaginationQuery(
      this.summaryModel.find({ ...conditions }).populate('user'),
      option,
    );
    const summaries = await query.exec();
    if (!summaries?.length) return [];
    return await Promise.all(
      summaries.map(async (summary) => {
        const subCategory = subCategories.find(
          (c) => c.id === summary.subCategory,
        );
        const category = categories.find((c) => c.id === summary.category);
        const image = await summary.getImageFullPath();
        return { ...summary.toJSON(), subCategory, category, image };
      }),
    );
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
      image: string;
    }
  > {
    const summary = (await this.summaryModel
      .findById(id, option)
      .populate('user')) as Omit<Summary, 'category' | 'subCategory'> & {
      category: Partial<typeof categories[number]>;
      subCategory: Partial<typeof subCategories[number]>;
    } & {
      toJSON: () => Omit<Summary, 'category' | 'subCategory'> & {
        category: Partial<typeof categories[number]>;
        subCategory: Partial<typeof subCategories[number]>;
      };
    };
    if (!summary) return null;

    const image = await summary.getImageFullPath();
    const category = categories.find((c) => c.id === summary.category);
    const subCategory = subCategories.find((c) => c.id === summary.subCategory);

    return {
      ...summary.toJSON(),
      image,
      category,
      subCategory,
    };
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
