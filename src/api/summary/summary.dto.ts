import { IsNumber, IsString, IsMongoId } from 'class-validator';

export class SummaryDTO {
  @IsString()
  title: string;

  @IsString()
  bookName: string;

  @IsString()
  content: string;

  @IsString()
  discription: string;

  @IsString()
  thumbnail: string;

  @IsNumber()
  favoriteCount: number;

  @IsString()
  publishingStatus: string;

  @IsString()
  image: string;

  @IsMongoId()
  category: string;

  @IsMongoId()
  subCategory: string;

  @IsMongoId()
  user: string;

  @IsMongoId()
  favorite: string;
}
