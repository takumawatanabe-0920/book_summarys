import { IsMongoId, IsOptional, IsNumber, IsString } from 'class-validator';

export class CategoryDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsNumber()
  display_order: number;

  @IsOptional()
  @IsString()
  image: string;
}
