import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Delete,
  Body,
  ValidationPipe,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FavoriteDTO } from './favorite.dto';
import {
  FavoriteApplication,
  UserFavoriteApplication,
  SummaryFavoriteApplication,
} from './favorite.application';
import { PaginationOptions } from '../../config/mongoOption';
import { getId } from '../../config/objectId';
@Controller('favorites')
export class FavoriteController {
  constructor(
    @Inject(FavoriteApplication)
    private readonly favoriteApplication: FavoriteApplication,
  ) {}

  @Get()
  async list(
    @Query('userId') userId,
    @Query('page') page,
    @Query('limit') limit,
  ): Promise<ReturnType<FavoriteApplication['list']>> {
    try {
      const conditions = {};
      if (userId) {
        conditions['user'] = userId;
      }
      const option: PaginationOptions = {};
      if (limit) {
        option.limit = Number(limit);
      }
      if (page) {
        option.page = Number(page);
      }
      return await this.favoriteApplication.list(conditions, option);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get('count')
  async count(): Promise<ReturnType<FavoriteApplication['count']>> {
    try {
      return await this.favoriteApplication.count();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

@Controller('users/:userId/favorites')
export class UserFavoriteController {
  constructor(
    @Inject(UserFavoriteApplication)
    private readonly userFavoriteApplication: UserFavoriteApplication,
  ) {}

  @Get()
  async get(
    @Param('userId') userId: string,
    @Query('page') page,
    @Query('limit') limit,
  ): Promise<ReturnType<UserFavoriteApplication['list']>> {
    try {
      if (!userId) {
        throw new BadRequestException('id is required');
      }
      const conditions = {};
      if (userId) {
        conditions['user'] = userId;
      }
      const option: PaginationOptions = {};
      if (limit) {
        option.limit = Number(limit);
      }
      if (page) {
        option.page = Number(page);
      }
      const favorite = await this.userFavoriteApplication.list(
        conditions,
        option,
      );
      return favorite;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

@Controller('summaries/:summaryId/favorites')
export class SummaryFavoriteController {
  constructor(
    @Inject(SummaryFavoriteApplication)
    private readonly summaryFavoriteApplication: SummaryFavoriteApplication,
  ) {}

  @Get('user/:userId')
  async get(
    @Param('summaryId') summaryId: string,
    @Param('userId') userId: string,
  ): Promise<ReturnType<SummaryFavoriteApplication['getByUserId']>> {
    try {
      if (!summaryId) {
        throw new BadRequestException('summaryId is required');
      }
      if (!userId) {
        throw new BadRequestException('userId is required');
      }
      return await this.summaryFavoriteApplication.getByUserId({
        query: { summary: summaryId, user: userId },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post()
  async create(
    @Param('summaryId') summaryId: string,
    @Body(new ValidationPipe()) body: FavoriteDTO,
  ): Promise<ReturnType<SummaryFavoriteApplication['create']>> {
    try {
      if (!getId(summaryId)) {
        throw new BadRequestException('summary is required');
      }
      return await this.summaryFavoriteApplication.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id,
    @Param('summaryId') summaryId: string,
  ): Promise<ReturnType<SummaryFavoriteApplication['delete']>> {
    try {
      if (!id || !summaryId) {
        throw new BadRequestException('id or summaryId is required');
      }
      return await this.summaryFavoriteApplication.delete({ id, summaryId });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
