import { IsString, IsMongoId, IsNotEmpty } from 'class-validator';

export class SummaryCommentDTO {
  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @IsNotEmpty()
  @IsMongoId()
  summary: string;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
