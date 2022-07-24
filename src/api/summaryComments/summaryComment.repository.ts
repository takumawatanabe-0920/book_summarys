import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  SummaryComment,
  SummaryCommentDocument,
} from './summaryComment.schema';
import { SummaryCommentDTO } from './summaryComment.dto';
import { PaginationOptions } from '../../config/mongoOption';
import { getPaginationQuery } from '../../config/lib/repositories';
@Injectable()
export class SummaryCommentRepository {
  constructor(
    @InjectModel(SummaryComment.name)
    private readonly summaryCommentModel: Model<SummaryCommentDocument>,
  ) {}

  async list(
    conditions: Partial<SummaryCommentDTO> = {},
    option: PaginationOptions,
  ): Promise<SummaryComment[]> {
    const query = getPaginationQuery(
      this.summaryCommentModel.find({ ...conditions }).populate('user'),
      option,
    );
    return await query.exec();
  }

  async getById(id: string): Promise<SummaryComment> {
    return (await this.summaryCommentModel.findById(id)).populate('summary');
  }

  async create(summaryComment: SummaryCommentDTO): Promise<SummaryComment> {
    const createdSummaryComment = new this.summaryCommentModel(summaryComment);
    return createdSummaryComment.save();
  }

  async update(
    id: string,
    summaryComment: SummaryCommentDTO,
  ): Promise<SummaryComment> {
    return this.summaryCommentModel.findByIdAndUpdate(id, summaryComment);
  }

  async delete(id: string): Promise<SummaryComment> {
    return this.summaryCommentModel.findByIdAndRemove(id);
  }
}
