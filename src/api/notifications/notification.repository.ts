import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './notification.schema';
import { NotificationDTO } from './notification.dto';
import { PaginationOptions } from '../../config/mongoOption';
import { getPaginationQuery } from '../../config/lib/repositories';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  async list(
    conditions: Partial<NotificationDTO> = {},
    option: PaginationOptions,
  ): Promise<Notification[]> {
    const query = getPaginationQuery(
      this.notificationModel.find({ ...conditions }).populate('item'),
      option,
    );
    return await query.exec();
  }

  async count(conditions: Partial<NotificationDTO> = {}): Promise<number> {
    return this.notificationModel.countDocuments(conditions);
  }

  async getById(id: string): Promise<Notification> {
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
