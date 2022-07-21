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
import { FavoriteRepository } from './favorite.repository';
import { Favorite, FavoriteSchema } from './favorite.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
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
  ],
})
export class FavoriteModule {}
