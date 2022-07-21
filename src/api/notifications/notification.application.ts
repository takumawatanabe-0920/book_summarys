import { Injectable, Inject } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { NotificationDTO } from './notification.dto';

@Injectable()
export class NotificationApplication {
  constructor(
    @Inject(NotificationRepository)
    private notificationRepository: NotificationRepository,
  ) {}

  async index(): Promise<ReturnType<NotificationRepository['findAll']>> {
    try {
      return await this.notificationRepository.findAll();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async show(
    id: string,
  ): Promise<ReturnType<NotificationRepository['findById']>> {
    try {
      return await this.notificationRepository.findById(id);
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
