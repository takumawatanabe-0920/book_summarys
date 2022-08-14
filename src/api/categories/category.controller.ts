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
import { CategoryDTO } from './category.dto';
import { CategoryApplication } from './category.application';
@Controller('categories')
export class CategoryController {
  constructor(
    @Inject(CategoryApplication)
    private readonly categoryApplication: CategoryApplication,
  ) {}

  @Get()
  async list(): Promise<ReturnType<CategoryApplication['list']>> {
    try {
      return await this.categoryApplication.list();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get(':id')
  async get(
    @Param('id') id: string,
  ): Promise<ReturnType<CategoryApplication['get']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      const category = await this.categoryApplication.get(id);
      if (!category) {
        throw new NotFoundException('category not found');
      }
      return category;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) body: CategoryDTO,
  ): Promise<ReturnType<CategoryApplication['create']>> {
    try {
      const { name, slug } = body;
      if (!name || !slug) {
        throw new BadRequestException('name and slug are required');
      }
      return await this.categoryApplication.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body(new ValidationPipe()) body: CategoryDTO,
  ): Promise<ReturnType<CategoryApplication['update']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      return await this.categoryApplication.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id,
  ): Promise<ReturnType<CategoryApplication['delete']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      return await this.categoryApplication.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
