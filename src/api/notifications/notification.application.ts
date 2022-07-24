import { Injectable, Inject } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { NotificationDTO } from './notification.dto';
import { PaginationOptions } from '../../config/mongoOption';
import { BadRequestException } from '@nestjs/common';
@Injectable()
export class NotificationApplication {
  constructor(
    @Inject(NotificationRepository)
    private notificationRepository: NotificationRepository,
  ) {}

  async list(
    conditions: Partial<NotificationDTO> = {},
    option: PaginationOptions,
  ): Promise<ReturnType<NotificationRepository['list']>> {
    try {
      return await this.notificationRepository.list(conditions, option);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async count(
    conditions: Partial<NotificationDTO> = {},
  ): Promise<ReturnType<NotificationRepository['count']>> {
    try {
      return await this.notificationRepository.count(conditions);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async get(
    id: string,
  ): Promise<ReturnType<NotificationRepository['getById']>> {
    try {
      return await this.notificationRepository.getById(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(
    body: NotificationDTO,
  ): Promise<ReturnType<NotificationRepository['create']>> {
    try {
      return await this.notificationRepository.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(
    id: string,
    body: NotificationDTO,
  ): Promise<ReturnType<NotificationRepository['update']>> {
    try {
      return await this.notificationRepository.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(
    id: string,
  ): Promise<ReturnType<NotificationRepository['update']>> {
    try {
      return await this.notificationRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

@Injectable()
export class UserNotificationApplication {
  constructor(
    @Inject(NotificationRepository)
    private notificationRepository: NotificationRepository,
  ) {}

  async markAllAsRead(
    conditions: Partial<NotificationDTO>,
  ): Promise<ReturnType<NotificationRepository['markAsRead']>> {
    try {
      const { type, targetUser } = conditions;
      if (!type || !targetUser) {
        throw new BadRequestException('type and targetUser are required');
      }
      return await this.notificationRepository.markAsRead(conditions);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
