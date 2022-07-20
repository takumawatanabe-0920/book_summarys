import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Favorite, FavoriteDocument } from './favorite.schema';
import { FavoriteDTO } from './favorite.dto';

@Injectable()
export class FavoriteRepository {
  constructor(
    @InjectModel(Favorite.name)
    private readonly favoriteModel: Model<FavoriteDocument>,
  ) {}

  async findAll(): Promise<Favorite[]> {
    return this.favoriteModel.find().lean();
  }

  async findById(id: string): Promise<Favorite> {
    return this.favoriteModel.findById(id).lean();
  }

  async create(favorite: FavoriteDTO): Promise<Favorite> {
    const createdFavorite = new this.favoriteModel(favorite);
    return createdFavorite.save();
  }

  async update(id: string, favorite: FavoriteDTO): Promise<Favorite> {
    return this.favoriteModel.findByIdAndUpdate(id, favorite);
  }

  async delete(id: string): Promise<Favorite> {
    return this.favoriteModel.findByIdAndRemove(id);
  }
}