import { IsMongoId, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class SubCategoryDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNumber()
  displayOrder: number;

  @IsString()
  image: string;

  @IsNotEmpty()
  @IsMongoId()
  category: string;
}
