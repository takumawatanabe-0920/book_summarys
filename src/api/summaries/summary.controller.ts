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
  Req,
  UseGuards,
} from '@nestjs/common';
import { UpdateSummaryDTO, CreateSummaryDTO } from './summary.dto';
import { SummaryApplication } from './summary.application';
import { PaginationOptions } from '../../config/mongoOption';
import dayjs from 'dayjs';
import { getId } from 'src/config/objectId';
import { JwtAuthGuard } from 'src/api/auth/jwt-auth.guard';
@Controller('summaries')
export class SummaryController {
  constructor(
    @Inject(SummaryApplication)
    private readonly summaryApplication: SummaryApplication,
  ) {}

  @Get()
  async list(
    @Query('sortKey') sortKey,
    @Query('order') order,
    @Query('userId') userId,
    @Query('categoryId') categoryId,
    @Query('publishingStatus') publishingStatus,
    @Query('startDate') startDate,
    @Query('endDate') endDate,
    @Query('page') page,
    @Query('limit') limit,
  ): Promise<ReturnType<SummaryApplication['list']>> {
    try {
      const conditions = {} as { [key: string]: any };
      if (userId) {
        conditions['user'] = userId;
      }
      if (categoryId) {
        conditions['category'] = categoryId;
      }
      if (publishingStatus) {
        conditions['publishingStatus'] = publishingStatus;
      }
      if (startDate || endDate) {
        const startAt = dayjs(startDate);
        conditions.createdAt = {};
        if (startDate && startAt.isValid()) {
          conditions.createdAt.$gte = startAt.startOf('date').toDate();
        }
        const endAt = dayjs(endDate);
        if (endDate && endAt.isValid()) {
          conditions.createdAt.$lte = endAt.endOf('date').toDate();
        }
      }

      const option: PaginationOptions = {};
      if (sortKey) {
        option.sort = sortKey;
        option.direction = order ? order : 'asc';
      }
      if (limit) {
        option.limit = Number(limit);
      }
      if (page) {
        option.page = Number(page);
      }

      return await this.summaryApplication.list(conditions, option);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get('count')
  async count(
    @Query('categoryId') categoryId: string,
    @Query('userId') userId: string,
    @Query('publishingStatus') publishingStatus: string,
  ): Promise<ReturnType<SummaryApplication['count']>> {
    try {
      const conditions = {};
      if (categoryId) {
        conditions['category'] = categoryId;
      }
      if (userId) {
        conditions['user'] = userId;
      }
      if (publishingStatus) {
        conditions['publishingStatus'] = publishingStatus;
      }
      return await this.summaryApplication.count(conditions);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get('signedUrl')
  async signedUrl(@Query('mime') mime, @Query('ext') ext) {
    return await this.summaryApplication.signedUrl(ext, mime);
  }

  @Get(':id')
  async get(
    @Param('id') id: string,
  ): Promise<ReturnType<SummaryApplication['get']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      const summary = await this.summaryApplication.get(id);
      if (!summary) {
        throw new NotFoundException('summary not found');
      }
      return summary;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req,
    @Body(new ValidationPipe()) body: CreateSummaryDTO,
  ): Promise<ReturnType<SummaryApplication['create']>> {
    try {
      if (!req.user) {
        throw new BadRequestException('user is required');
      }
      return await this.summaryApplication.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Req() req,
    @Param('id') id,
    @Body(new ValidationPipe()) body: UpdateSummaryDTO,
  ): Promise<ReturnType<SummaryApplication['update']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      if (!req.user) {
        throw new BadRequestException('user is required');
      }
      const summary = await this.summaryApplication.get(id);
      if (!summary) {
        throw new NotFoundException('summary not found');
      }
      if (getId(summary.user) !== getId(req.user)) {
        throw new BadRequestException('user is not match');
      }
      return await this.summaryApplication.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Req() req,
    @Param('id') id,
  ): Promise<ReturnType<SummaryApplication['delete']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      return await this.summaryApplication.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
