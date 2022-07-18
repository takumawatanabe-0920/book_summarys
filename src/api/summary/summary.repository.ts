import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Summary, SummaryDocument } from './summary.schema';
import { SummaryDTO } from './summary.dto';

@Injectable()
export class SummaryRepository {
  constructor(
    @InjectModel(Summary.name)
    private readonly summaryModel: Model<SummaryDocument>,
  ) {}

  async findAll(): Promise<Summary[]> {
    return this.summaryModel.find().lean();
  }

  async findById(id: string): Promise<Summary> {
    return this.summaryModel.findById(id).lean();
  }

  async create(summary: SummaryDTO): Promise<Summary> {
    const createdSummary = new this.summaryModel(summary);
    return createdSummary.save();
  }

  async update(id: string, summary: SummaryDTO): Promise<Summary> {
    return this.summaryModel.findByIdAndUpdate(id, summary);
  }

  async delete(id: string): Promise<Summary> {
    return this.summaryModel.findByIdAndRemove(id);
  }
}
