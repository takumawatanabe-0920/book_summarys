import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Summary, SummaryDocument } from './summary.schema';
import { SummaryDTO } from './summary.dto';
import { PaginationOptions, repositories } from '../../config/mongoOption';
import { getPaginationQuery } from '../../config/lib/repositories';
import { UpdateBody } from '../../types/mongoose';
@Injectable()
export class SummaryRepository {
  constructor(
    @InjectModel(Summary.name)
    private readonly summaryModel: Model<SummaryDocument>,
  ) {}

  async list(
    conditions: Partial<SummaryDTO>,
    option: PaginationOptions,
  ): Promise<Summary[]> {
    const query = getPaginationQuery(
      this.summaryModel
        .find({ ...conditions })
        .populate('category')
        .populate('subCategory')
        .populate('user'),
      option,
    );
    return await query.exec();
  }

  async count(conditions: Partial<SummaryDTO> = {}): Promise<number> {
    return await this.summaryModel.countDocuments(conditions);
  }

  async getById(
    id: string,
    option: repositories.BaseOptions = {},
  ): Promise<Summary> {
    return (await this.summaryModel.findById(id, option))
      .populated('user')
      .populated('category')
      .populated('subCategory')
      .lean();
  }

  async create(summary: SummaryDTO): Promise<Summary> {
    const createdSummary = new this.summaryModel(summary);
    return createdSummary.save();
  }

  async update(
    id: string,
    summary: UpdateBody<any> | SummaryDTO,
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
