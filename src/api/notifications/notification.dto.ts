import { IsBoolean, IsMongoId, IsNotEmpty, IsEnum } from 'class-validator';
import { notificationTypes } from './notification.schema';
export class NotificationDTO {
  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @IsNotEmpty()
  @IsMongoId()
  targetUser: string;

  @IsBoolean()
  isRead: boolean;

  @IsNotEmpty()
  @IsEnum(notificationTypes)
  reference: typeof notificationTypes;

  @IsNotEmpty()
  @IsMongoId()
  item: string;
}
