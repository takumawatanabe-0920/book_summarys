import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Favorite, FavoriteDocument } from './favorite.schema';
import { FavoriteDTO } from './favorite.dto';
import { repositories } from '../../config/mongoOption';
import { PaginationOptions } from '../../config/mongoOption';
import { getPaginationQuery } from '../../config/lib/repositories';

@Injectable()
export class FavoriteRepository {
  constructor(
    @InjectModel(Favorite.name)
    private readonly favoriteModel: Model<FavoriteDocument>,
  ) {}

  async list(
    conditions: Partial<FavoriteDTO>,
    option: PaginationOptions,
  ): Promise<Favorite[]> {
    const query = getPaginationQuery(
      this.favoriteModel.find(conditions),
      option,
    );
    return await query.exec();
  }

  async getById(id: string): Promise<Favorite> {
    return await this.favoriteModel.findById(id).lean();
  }

  async get(args: Partial<FavoriteDTO>): Promise<Favorite[]> {
    return await this.favoriteModel.find(args).lean();
  }

  async create(
    favorite: FavoriteDTO,
    option?: repositories.BaseOptions,
  ): Promise<Favorite> {
    const createdFavorite = new this.favoriteModel(favorite);
    return createdFavorite.save(option);
  }

  async update(id: string, favorite: FavoriteDTO): Promise<Favorite> {
    return await this.favoriteModel.findByIdAndUpdate(id, favorite, {
      new: true,
    });
  }

  async count(): Promise<number> {
    return await this.favoriteModel.countDocuments();
  }

  async delete(
    id: string,
    option?: repositories.BaseOptions,
  ): Promise<Favorite> {
    return await this.favoriteModel.findByIdAndRemove(id, option);
  }
}
