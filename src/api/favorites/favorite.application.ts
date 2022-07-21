import { Injectable, Inject } from '@nestjs/common';
import { FavoriteRepository } from './favorite.repository';
import { FavoriteDTO } from './favorite.dto';

@Injectable()
export class UserFavoriteApplication {
  constructor(
    @Inject(FavoriteRepository)
    private favoriteRepository: FavoriteRepository,
  ) {}

  async list(): Promise<ReturnType<FavoriteRepository['list']>> {
    try {
      return await this.favoriteRepository.list();
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

  async create(
    body: FavoriteDTO,
  ): Promise<ReturnType<FavoriteRepository['create']>> {
    try {
      return await this.favoriteRepository.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: string): Promise<ReturnType<FavoriteRepository['update']>> {
    try {
      return await this.favoriteRepository.delete(id);
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

  async list(): Promise<ReturnType<FavoriteRepository['list']>> {
    try {
      return await this.favoriteRepository.list();
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
}
