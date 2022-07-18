import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './notification.schema';
import { NotificationDTO } from './notification.dto';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.find().lean();
  }

  async findById(id: string): Promise<Notification> {
    return this.notificationModel.findById(id).lean();
  }

  async create(notification: NotificationDTO): Promise<Notification> {
    const createdNotification = new this.notificationModel(notification);
    return createdNotification.save();
  }

  async update(
    id: string,
    notification: NotificationDTO,
  ): Promise<Notification> {
    return this.notificationModel.findByIdAndUpdate(id, notification);
  }

  async delete(id: string): Promise<Notification> {
    return this.notificationModel.findByIdAndRemove(id);
  }
}
