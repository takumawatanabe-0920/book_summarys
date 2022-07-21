import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoriteController } from './favorite.controller';
import { FavoriteApplication } from './favorite.application';
import { FavoriteRepository } from './favorite.repository';
import { Favorite, FavoriteSchema } from './favorite.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteApplication, FavoriteRepository],
})
export class FavoriteModule {}
