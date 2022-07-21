import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  SummaryComment,
  SummaryCommentDocument,
} from './summaryComment.schema';
import { SummaryCommentDTO } from './summaryComment.dto';

@Injectable()
export class SummaryCommentRepository {
  constructor(
    @InjectModel(SummaryComment.name)
    private readonly summaryCommentModel: Model<SummaryCommentDocument>,
  ) {}

  async findAll(): Promise<SummaryComment[]> {
    return this.summaryCommentModel.find().lean();
  }

  async findById(id: string): Promise<SummaryComment> {
    return this.summaryCommentModel.findById(id).lean();
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
