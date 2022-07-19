import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './subCategory/subCategory.module';
import { SummaryModule } from './summary/summary.module';
import { UserModule } from './user/user.module';
import { SummaryCommentModule } from './summaryComment/summaryComment.module';
import { NotificationModule } from './notification/notification.module';
import { FavoriteModule } from './favorite/favorite.module';
import { BrowsingModule } from './browsing/browsing.module';

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
    SummaryCommentModule,
    NotificationModule,
    BrowsingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
