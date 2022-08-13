import {
  IsString,
  IsMongoId,
  IsEnum,
  IsNotEmpty,
  IsArray,
  IsOptional,
} from 'class-validator';
import { publishingStatuses } from './summary.schema';
export class SummaryDTO {
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
  imageKey: string;

  @IsString()
  category: string;

  @IsString()
  subCategory: string;

  @IsMongoId()
  user: string;

  @IsMongoId()
  @IsArray()
  favorites: string[];
}

export class CreateSummaryDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  bookName: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  discription: string;

  @IsOptional()
  @IsString()
  thumbnail: string;

  @IsEnum(publishingStatuses)
  publishingStatus: string;

  @IsOptional()
  @IsString()
  imageKey: string;

  @IsString()
  category: string;

  @IsString()
  subCategory: string;

  @IsOptional()
  @IsMongoId()
  user: string;

  @IsOptional()
  @IsMongoId()
  @IsArray()
  favorites: string[];
}

export class UpdateSummaryDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  bookName: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  discription: string;

  @IsOptional()
  @IsString()
  thumbnail: string;

  @IsEnum(publishingStatuses)
  publishingStatus: string;

  @IsOptional()
  @IsString()
  imageKey: string;

  @IsString()
  category: string;

  @IsString()
  subCategory: string;

  @IsMongoId()
  user: string;

  @IsOptional()
  @IsMongoId()
  @IsArray()
  favorites: string[];
}
