import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { FavoriteRepository } from './favorite.repository';
import { SummaryRepository } from '../summaries/summary.repository';
import { FavoriteDTO } from './favorite.dto';
import { getId } from 'src/config/objectId';
import { PaginationOptions } from '../../config/mongoOption';

@Injectable()
export class UserFavoriteApplication {
  constructor(
    @Inject(FavoriteRepository)
    private favoriteRepository: FavoriteRepository,
  ) {}

  async list(
    conditions: Partial<FavoriteDTO>,
    option?: PaginationOptions,
  ): Promise<ReturnType<FavoriteRepository['list']>> {
    try {
      return await this.favoriteRepository.list(conditions, option);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async get(id: string): Promise<ReturnType<FavoriteRepository['getById']>> {
    try {
      return await this.favoriteRepository.getById(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

@Injectable()
export class FavoriteApplication {
  constructor(
    @Inject(FavoriteRepository)
    private favoriteRepository: FavoriteRepository,
  ) {}

  async list(
    conditions: Partial<FavoriteDTO>,
    option: PaginationOptions,
  ): Promise<ReturnType<FavoriteRepository['list']>> {
    try {
      return await this.favoriteRepository.list(conditions, option);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async count(): Promise<ReturnType<FavoriteRepository['count']>> {
    try {
      return await this.favoriteRepository.count();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

@Injectable()
export class SummaryFavoriteApplication {
  constructor(
    @Inject(FavoriteRepository)
    private favoriteRepository: FavoriteRepository,
    @Inject(SummaryRepository)
    private summaryRepository: SummaryRepository,
  ) {}

  async getByUserId(args: {
    query: Partial<FavoriteDTO>;
  }): Promise<ReturnType<FavoriteRepository['get']>> {
    try {
      return await this.favoriteRepository.get(args.query);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(
    body: FavoriteDTO,
  ): Promise<ReturnType<FavoriteRepository['create']>> {
    try {
      const { summary } = body;
      if (!summary) {
        throw new BadRequestException('summary is required');
      }
      const favorite = await this.favoriteRepository.create(body);
      if (!favorite) {
        throw new BadRequestException('summary is required');
      }
      await this.summaryRepository.update(summary, {
        $push: { favorites: getId(favorite) },
      });
      return favorite;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete({
    id,
    summaryId,
  }: {
    id: string;
    summaryId: string;
  }): Promise<ReturnType<FavoriteRepository['update']>> {
    try {
      await this.summaryRepository.update(summaryId, {
        $pull: { favorites: getId(id) },
      });
      return await this.favoriteRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
