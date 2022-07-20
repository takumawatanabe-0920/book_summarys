import { IsMongoId, isString } from 'class-validator';

export class SubCategoryDTO {
  @isString()
  name: string;

  @isString()
  slug: string;

  @isNumber()
  displayOrder: number;

  @isString()
  image: string;

  @IsMongoId()
  category: string;
}
