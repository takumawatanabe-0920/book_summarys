import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FavoriteDTO {
  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @IsNotEmpty()
  @IsMongoId()
  summary: string;
}
