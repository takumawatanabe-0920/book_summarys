import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from './notification.controller';
import { NotificationApplication } from './notification.application';
import { NotificationRepository } from './notification.repository';
import { Notification, NotificationSchema } from './notification.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationApplication, NotificationRepository],
})
export class NotificationModule {}
