import { IsMongoId } from 'class-validator';

export class BrowsingDTO {
  @IsMongoId()
  user: string;

  @IsMongoId()
  summary: string;
}
