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
import { SummaryCommentDTO } from './summaryComment.dto';
import { SummaryCommentApplication } from './summaryComment.application';

@Controller('summaryComment')
export class SummaryCommentController {
  constructor(
    @Inject(SummaryCommentApplication)
    private readonly summaryCommentApplication: SummaryCommentApplication,
  ) {}

  @Get()
  async index(): Promise<ReturnType<SummaryCommentApplication['index']>> {
    try {
      return await this.summaryCommentApplication.index();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get(':id')
  async show(
    @Param('id') id: string,
  ): Promise<ReturnType<SummaryCommentApplication['show']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      const summaryComment = await this.summaryCommentApplication.show(id);
      if (!summaryComment) {
        throw new NotFoundException('summaryComment not found');
      }
      return summaryComment;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) body: SummaryCommentDTO,
  ): Promise<ReturnType<SummaryCommentApplication['create']>> {
    try {
      return await this.summaryCommentApplication.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body(new ValidationPipe()) body: SummaryCommentDTO,
  ): Promise<ReturnType<SummaryCommentApplication['update']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      return await this.summaryCommentApplication.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id,
  ): Promise<ReturnType<SummaryCommentApplication['delete']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      return await this.summaryCommentApplication.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
