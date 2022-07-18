import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './category/core/category.controller';
import { CategoryService } from './category/core/category.service';
import { CategoryModule } from './category/core/category.module';
import * as config from 'config';
@Module({
  imports: [
    MongooseModule.forRoot(
      config.get('mongodb.uri'),
      config.get('mongodb.options'),
    ),
    CategoryModule,
  ],
  controllers: [AppController, CategoryController],
  providers: [AppService, CategoryService],
})
export class AppModule {}
