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
import { SubCategoryDTO } from './subCategory.dto';
import { SubCategoryApplication } from './subCategory.application';

@Controller('subCategories')
export class SubCategoryController {
  constructor(
    @Inject(SubCategoryApplication)
    private readonly subCategoryApplication: SubCategoryApplication,
  ) {}

  @Get()
  async list(): Promise<ReturnType<SubCategoryApplication['list']>> {
    try {
      return await this.subCategoryApplication.list();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get(':id')
  async get(
    @Param('id') id: string,
  ): Promise<ReturnType<SubCategoryApplication['get']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      const subCategory = await this.subCategoryApplication.get(id);
      if (!subCategory) {
        throw new NotFoundException('subCategory not found');
      }
      return subCategory;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) body: SubCategoryDTO,
  ): Promise<ReturnType<SubCategoryApplication['create']>> {
    try {
      return await this.subCategoryApplication.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body(new ValidationPipe()) body: SubCategoryDTO,
  ): Promise<ReturnType<SubCategoryApplication['update']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      return await this.subCategoryApplication.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id,
  ): Promise<ReturnType<SubCategoryApplication['delete']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      return await this.subCategoryApplication.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
