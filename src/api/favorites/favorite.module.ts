import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FavoriteController,
  SummaryFavoriteController,
  UserFavoriteController,
} from './favorite.controller';
import {
  FavoriteApplication,
  UserFavoriteApplication,
  SummaryFavoriteApplication,
} from './favorite.application';
import { SummaryRepository } from '../summaries/summary.repository';
import { FavoriteRepository } from './favorite.repository';
import { Favorite, FavoriteSchema } from './favorite.schema';
import { Summary, SummarySchema } from '../summaries/summary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
      { name: Summary.name, schema: SummarySchema },
    ]),
  ],
  controllers: [
    FavoriteController,
    SummaryFavoriteController,
    UserFavoriteController,
  ],
  providers: [
    FavoriteApplication,
    UserFavoriteApplication,
    SummaryFavoriteApplication,
    FavoriteRepository,
    SummaryRepository,
  ],
})
export class FavoriteModule {}
