import { IsOptional, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CategoryDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsOptional()
  @IsNumber()
  displayOrder: number;

  @IsOptional()
  @IsString()
  image: string;
}
