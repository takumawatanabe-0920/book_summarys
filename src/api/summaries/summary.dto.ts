import {
  IsString,
  IsMongoId,
  IsEnum,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { publishingStatuses } from './summary.schema';
export class SummaryDTO {
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @IsNotEmpty()
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

  @IsEnum(publishingStatuses)
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
  @IsArray()
  favorites: string[];
}
