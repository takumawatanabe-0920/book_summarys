import { Injectable, Inject } from '@nestjs/common';
import { SummaryCommentRepository } from './summaryComment.repository';
import { SummaryCommentDTO } from './summaryComment.dto';

@Injectable()
export class SummaryCommentApplication {
  constructor(
    @Inject(SummaryCommentRepository)
    private summaryCommentRepository: SummaryCommentRepository,
  ) {}

  async index(): Promise<ReturnType<SummaryCommentRepository['findAll']>> {
    try {
      return await this.summaryCommentRepository.findAll();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async show(
    id: string,
  ): Promise<ReturnType<SummaryCommentRepository['findById']>> {
    try {
      return await this.summaryCommentRepository.findById(id);
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
