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
  NotFoundException,
  Query,
} from '@nestjs/common';
import { FavoriteDTO } from './favorite.dto';
import {
  FavoriteApplication,
  UserFavoriteApplication,
  SummaryFavoriteApplication,
} from './favorite.application';
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
  ): Promise<ReturnType<FavoriteApplication['list']>> {
    try {
      const conditions = {};
      if (userId) {
        conditions['user'] = userId;
      }
      return await this.favoriteApplication.list(conditions);
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
    @Inject(FavoriteApplication)
    private readonly userFavoriteApplication: UserFavoriteApplication,
  ) {}

  @Get(':id')
  async get(
    @Param('id') id: string,
  ): Promise<ReturnType<UserFavoriteApplication['get']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      const favorite = await this.userFavoriteApplication.get(id);
      if (!favorite) {
        throw new NotFoundException('favorite not found');
      }
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
    @Inject(FavoriteApplication)
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
