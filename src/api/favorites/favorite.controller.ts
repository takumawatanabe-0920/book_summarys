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
import { FavoriteDTO } from './favorite.dto';
import { FavoriteApplication } from './favorite.application';

@Controller('favorites')
export class FavoriteController {
  constructor(
    @Inject(FavoriteApplication)
    private readonly favoriteApplication: FavoriteApplication,
  ) {}

  @Get()
  async index(): Promise<ReturnType<FavoriteApplication['index']>> {
    try {
      return await this.favoriteApplication.index();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get(':id')
  async show(
    @Param('id') id: string,
  ): Promise<ReturnType<FavoriteApplication['show']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      const favorite = await this.favoriteApplication.show(id);
      if (!favorite) {
        throw new NotFoundException('favorite not found');
      }
      return favorite;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) body: FavoriteDTO,
  ): Promise<ReturnType<FavoriteApplication['create']>> {
    try {
      return await this.favoriteApplication.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body(new ValidationPipe()) body: FavoriteDTO,
  ): Promise<ReturnType<FavoriteApplication['update']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      return await this.favoriteApplication.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id,
  ): Promise<ReturnType<FavoriteApplication['delete']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      return await this.favoriteApplication.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
