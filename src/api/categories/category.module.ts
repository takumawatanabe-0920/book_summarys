import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { CategoryApplication } from './category.application';
import { CategoryRepository } from './category.repository';
import { Category, CategorySchema } from './category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryApplication, CategoryRepository],
})
export class CategoryModule {}
