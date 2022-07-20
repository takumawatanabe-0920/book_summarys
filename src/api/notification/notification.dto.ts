import { IsBoolean, IsString, IsMongoId } from 'class-validator';

export class NotificationDTO {
  @IsMongoId()
  user: string;

  @IsMongoId()
  targetUser: string;

  @IsMongoId()
  item: string;

  @IsString()
  reference: string;

  @IsBoolean()
  isRead: boolean;
}
