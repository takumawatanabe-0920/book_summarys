import { IsString, IsMongoId } from 'class-validator';

export class SummaryCommentDTO {
  @IsMongoId()
  user: string;

  @IsMongoId()
  summary: string;

  @IsString()
  comment: string;
}
