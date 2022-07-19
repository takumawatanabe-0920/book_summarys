import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Browsing, BrowsingDocument } from './browsing.schema';
import { BrowsingDTO } from './browsing.dto';

@Injectable()
export class BrowsingRepository {
  constructor(
    @InjectModel(Browsing.name)
    private readonly browsingModel: Model<BrowsingDocument>,
  ) {}

  async findAll(): Promise<Browsing[]> {
    return this.browsingModel.find().lean();
  }

  async findById(id: string): Promise<Browsing> {
    return this.browsingModel.findById(id).lean();
  }

  async create(browsing: BrowsingDTO): Promise<Browsing> {
    const createdBrowsing = new this.browsingModel(browsing);
    return createdBrowsing.save();
  }

  async update(id: string, browsing: BrowsingDTO): Promise<Browsing> {
    return this.browsingModel.findByIdAndUpdate(id, browsing);
  }

  async delete(id: string): Promise<Browsing> {
    return this.browsingModel.findByIdAndRemove(id);
  }
}
