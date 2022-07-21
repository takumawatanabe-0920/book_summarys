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
import { SummaryDTO } from './summary.dto';
import { SummaryApplication } from './summary.application';

@Controller('summaries')
export class SummaryController {
  constructor(
    @Inject(SummaryApplication)
    private readonly summaryApplication: SummaryApplication,
  ) {}

  @Get()
  async list(): Promise<ReturnType<SummaryApplication['list']>> {
    try {
      return await this.summaryApplication.list();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get(':id')
  async get(
    @Param('id') id: string,
  ): Promise<ReturnType<SummaryApplication['get']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      const summary = await this.summaryApplication.get(id);
      if (!summary) {
        throw new NotFoundException('summary not found');
      }
      return summary;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) body: SummaryDTO,
  ): Promise<ReturnType<SummaryApplication['create']>> {
    try {
      return await this.summaryApplication.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body(new ValidationPipe()) body: SummaryDTO,
  ): Promise<ReturnType<SummaryApplication['update']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      return await this.summaryApplication.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id,
  ): Promise<ReturnType<SummaryApplication['delete']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      return await this.summaryApplication.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
