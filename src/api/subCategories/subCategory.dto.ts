import { IsMongoId, IsString, IsNumber } from 'class-validator';

export class SubCategoryDTO {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsNumber()
  displayOrder: number;

  @IsString()
  image: string;

  @IsMongoId()
  category: string;
}
