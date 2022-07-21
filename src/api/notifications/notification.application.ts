import { Injectable, Inject } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { NotificationDTO } from './notification.dto';

@Injectable()
export class NotificationApplication {
  constructor(
    @Inject(NotificationRepository)
    private notificationRepository: NotificationRepository,
  ) {}

  async list(): Promise<ReturnType<NotificationRepository['list']>> {
    try {
      return await this.notificationRepository.list();
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
