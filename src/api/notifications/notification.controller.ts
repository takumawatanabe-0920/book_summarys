import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Delete,
  Body,
  ValidationPipe,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { NotificationDTO } from './notification.dto';
import { NotificationApplication } from './notification.application';

@Controller('notifications')
export class NotificationController {
  constructor(
    @Inject(NotificationApplication)
    private readonly notificationApplication: NotificationApplication,
  ) {}

  @Get()
  async index(): Promise<ReturnType<NotificationApplication['index']>> {
    try {
      return await this.notificationApplication.index();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get(':id')
  async show(
    @Param('id') id: string,
  ): Promise<ReturnType<NotificationApplication['show']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      const notification = await this.notificationApplication.show(id);
      if (!notification) {
        throw new NotFoundException('notification not found');
      }
      return notification;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) body: NotificationDTO,
  ): Promise<ReturnType<NotificationApplication['create']>> {
    try {
      return await this.notificationApplication.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body(new ValidationPipe()) body: NotificationDTO,
  ): Promise<ReturnType<NotificationApplication['update']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      return await this.notificationApplication.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id,
  ): Promise<ReturnType<NotificationApplication['delete']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      return await this.notificationApplication.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
