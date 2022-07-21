import { Injectable, Inject } from '@nestjs/common';
import { SummaryRepository } from './summary.repository';
import { SummaryDTO } from './summary.dto';

@Injectable()
export class SummaryApplication {
  constructor(
    @Inject(SummaryRepository)
    private summaryRepository: SummaryRepository,
  ) {}

  async list(): Promise<ReturnType<SummaryRepository['list']>> {
    try {
      return await this.summaryRepository.list();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async get(id: string): Promise<ReturnType<SummaryRepository['getById']>> {
    try {
      return await this.summaryRepository.getById(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(
    body: SummaryDTO,
  ): Promise<ReturnType<SummaryRepository['create']>> {
    try {
      return await this.summaryRepository.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(
    id: string,
    body: SummaryDTO,
  ): Promise<ReturnType<SummaryRepository['update']>> {
    try {
      return await this.summaryRepository.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: string): Promise<ReturnType<SummaryRepository['update']>> {
    try {
      return await this.summaryRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
