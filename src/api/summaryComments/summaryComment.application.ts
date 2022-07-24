import { Injectable, Inject } from '@nestjs/common';
import { SummaryCommentRepository } from './summaryComment.repository';
import { SummaryCommentDTO } from './summaryComment.dto';
import { PaginationOptions } from '../../config/mongoOption';
@Injectable()
export class SummaryCommentApplication {
  constructor(
    @Inject(SummaryCommentRepository)
    private summaryCommentRepository: SummaryCommentRepository,
  ) {}

  async list(
    conditions: Partial<SummaryCommentDTO> = {},
    option: PaginationOptions,
  ): Promise<ReturnType<SummaryCommentRepository['list']>> {
    try {
      return await this.summaryCommentRepository.list(conditions, option);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async get(
    id: string,
  ): Promise<ReturnType<SummaryCommentRepository['getById']>> {
    try {
      return await this.summaryCommentRepository.getById(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(
    body: SummaryCommentDTO,
  ): Promise<ReturnType<SummaryCommentRepository['create']>> {
    try {
      return await this.summaryCommentRepository.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(
    id: string,
    body: SummaryCommentDTO,
  ): Promise<ReturnType<SummaryCommentRepository['update']>> {
    try {
      return await this.summaryCommentRepository.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(
    id: string,
  ): Promise<ReturnType<SummaryCommentRepository['update']>> {
    try {
      return await this.summaryCommentRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
