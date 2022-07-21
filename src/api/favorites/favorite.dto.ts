import { IsMongoId } from 'class-validator';

export class FavoriteDTO {
  @IsMongoId()
  user: string;

  @IsMongoId()
  summary: string;
}
