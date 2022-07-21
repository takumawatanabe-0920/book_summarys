import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategoryController } from './subCategory.controller';
import { SubCategoryApplication } from './subCategory.application';
import { SubCategoryRepository } from './subCategory.repository';
import { SubCategory, SubCategorySchema } from './subCategory.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubCategory.name, schema: SubCategorySchema },
    ]),
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryApplication, SubCategoryRepository],
})
export class SubCategoryModule {}
