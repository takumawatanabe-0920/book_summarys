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
} from '@nestjs/common';
import { CategoryDTO } from './entity/category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(
    @Inject(CategoryService)
    private readonly categoryService: CategoryService,
  ) {}

  @Get()
  async index(): Promise<CategoryDTO[]> {
    try {
      return await this.categoryService.index();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<CategoryDTO> {
    try {
      return await this.categoryService.show(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post()
  async create(@Body(new ValidationPipe()) body: CategoryDTO) {
    try {
      return await this.categoryService.create(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id, @Body(new ValidationPipe()) body: CategoryDTO) {
    try {
      return await this.categoryService.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    try {
      return await this.categoryService.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
