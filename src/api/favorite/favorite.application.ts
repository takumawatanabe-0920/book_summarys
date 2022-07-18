import { Injectable, Inject } from '@nestjs/common';
import { FavoriteRepository } from './favorite.repository';
import { FavoriteDTO } from './favorite.dto';

@Injectable()
export class FavoriteApplication {
  constructor(
    @Inject(FavoriteRepository)
    private favoriteRepository: FavoriteRepository,
  ) {}

  async index(): Promise<ReturnType<FavoriteRepository['findAll']>> {
    try {
      return await this.favoriteRepository.findAll();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async show(id: string): Promise<ReturnType<FavoriteRepository['findById']>> {
    try {
      return await this.favoriteRepository.findById(id);
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

  async update(
    id: string,
    body: FavoriteDTO,
  ): Promise<ReturnType<FavoriteRepository['update']>> {
    try {
      return await this.favoriteRepository.update(id, body);
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
