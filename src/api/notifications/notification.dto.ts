import { IsBoolean, IsMongoId, IsNotEmpty, IsEnum } from 'class-validator';
import {
  notificationTypes,
  notificationReferences,
} from './notification.schema';
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
  reference: typeof notificationReferences;

  @IsNotEmpty()
  @IsMongoId()
  item: string;

  @IsNotEmpty()
  @IsEnum(notificationTypes)
  type: typeof notificationTypes;
}
