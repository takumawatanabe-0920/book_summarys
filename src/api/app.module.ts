import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './categories/category.module';
import { SubCategoryModule } from './subCategories/subCategory.module';
import { SummaryModule } from './summaries/summary.module';
import { UserModule } from './users/user.module';
import { FavoriteModule } from './favorites/favorite.module';
import { AuthModule } from './auth/auth.module';

import * as config from 'config';
@Module({
  imports: [
    MongooseModule.forRoot(
      config.get('mongodb.uri'),
      config.get('mongodb.options'),
    ),
    CategoryModule,
    FavoriteModule,
    SubCategoryModule,
    SummaryModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
