import { Injectable, Inject } from '@nestjs/common';
import { SummaryRepository } from './summary.repository';
import { SummaryDTO, CreateSummaryDTO, UpdateSummaryDTO } from './summary.dto';
import { PaginationOptions } from '../../config/mongoOption';
import { S3 } from 'src/api/lib/aws';
import { ObjectId } from 'mongodb';
@Injectable()
export class SummaryApplication {
  constructor(
    @Inject(SummaryRepository)
    private summaryRepository: SummaryRepository,
  ) {}

  async list(
    conditions: Partial<SummaryDTO>,
    option: PaginationOptions,
  ): Promise<ReturnType<SummaryRepository['list']>> {
    try {
      return await this.summaryRepository.list(conditions, option);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async count(conditions: Partial<SummaryDTO>): Promise<number> {
    try {
      return await this.summaryRepository.count(conditions);
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
    body: CreateSummaryDTO,
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
    body: UpdateSummaryDTO,
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

  async signedUrl(ext: string, mime: string) {
    const id = new ObjectId();
    const key = `summaries/${id}.${ext}`;
    const signedUrl = await S3.getSignedUrl({
      key,
      contentType: mime,
    });
    const imageUrl = await S3.getSignedUrl({
      key,
      contentType: mime,
      method: 'getObject',
    });

    return {
      key,
      signedUrl: signedUrl,
      imageUrl: imageUrl,
    };
  }
}
