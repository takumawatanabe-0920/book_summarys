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
  Query,
} from '@nestjs/common';
import { NotificationDTO } from './notification.dto';
import { NotificationApplication } from './notification.application';
import { PaginationOptions } from '../../config/mongoOption';
@Controller('notifications')
export class NotificationController {
  constructor(
    @Inject(NotificationApplication)
    private readonly notificationApplication: NotificationApplication,
  ) {}

  @Get()
  async list(
    @Query('sortKey') sortKey,
    @Query('order') order,
    @Query('userId') userId,
    @Query('targetUserId') targetUserId,
    @Query('type') type,
    @Query('isRead') isRead,
  ): Promise<ReturnType<NotificationApplication['list']>> {
    try {
      const conditions = {};
      if (userId) {
        conditions['user'] = userId;
      }
      if (targetUserId) {
        conditions['targetUser'] = targetUserId;
      }
      if (isRead) {
        conditions['isRead'] = isRead;
      }
      if (type) {
        conditions['type'] = type;
      }
      let option: PaginationOptions = {};
      if (sortKey) {
        option = {
          sort: sortKey,
          direction: order ? 'desc' : 'asc',
        };
      }
      return await this.notificationApplication.list(conditions, option);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get('count')
  async count(
    @Query('userId') userId,
    @Query('targetUserId') targetUserId,
    @Query('type') type,
    @Query('isRead') isRead,
  ): Promise<ReturnType<NotificationApplication['count']>> {
    try {
      const conditions = {};
      if (userId) {
        conditions['user'] = userId;
      }
      if (targetUserId) {
        conditions['targetUser'] = targetUserId;
      }
      if (isRead) {
        conditions['isRead'] = isRead;
      }
      if (type) {
        conditions['type'] = type;
      }
      return await this.notificationApplication.count(conditions);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get(':id')
  async get(
    @Param('id') id: string,
  ): Promise<ReturnType<NotificationApplication['get']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      const notification = await this.notificationApplication.get(id);
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
      const { user, targetUser, reference, item, type } = body;
      if (!user || !targetUser || !reference || !item || !type) {
        throw new BadRequestException(
          'user, targetUser, reference,type, item is required',
        );
      }
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
