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
import { BrowsingDTO } from './browsing.dto';
import { BrowsingApplication } from './browsing.application';

@Controller('browsing')
export class BrowsingController {
  constructor(
    @Inject(BrowsingApplication)
    private readonly browsingApplication: BrowsingApplication,
  ) {}

  @Get()
  async index(): Promise<ReturnType<BrowsingApplication['index']>> {
    try {
      return await this.browsingApplication.index();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get(':id')
  async show(
    @Param('id') id: string,
  ): Promise<ReturnType<BrowsingApplication['show']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      const browsing = await this.browsingApplication.show(id);
      if (!browsing) {
        throw new NotFoundException('browsing not found');
      }
      return browsing;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) body: BrowsingDTO,
  ): Promise<ReturnType<BrowsingApplication['create']>> {
    try {
      return await this.browsingApplication.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body(new ValidationPipe()) body: BrowsingDTO,
  ): Promise<ReturnType<BrowsingApplication['update']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      return await this.browsingApplication.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id,
  ): Promise<ReturnType<BrowsingApplication['delete']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      return await this.browsingApplication.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
