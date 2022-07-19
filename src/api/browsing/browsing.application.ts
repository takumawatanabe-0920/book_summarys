import { Injectable, Inject } from '@nestjs/common';
import { BrowsingRepository } from './browsing.repository';
import { BrowsingDTO } from './browsing.dto';

@Injectable()
export class BrowsingApplication {
  constructor(
    @Inject(BrowsingRepository)
    private browsingRepository: BrowsingRepository,
  ) {}

  async index(): Promise<ReturnType<BrowsingRepository['findAll']>> {
    try {
      return await this.browsingRepository.findAll();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async show(id: string): Promise<ReturnType<BrowsingRepository['findById']>> {
    try {
      return await this.browsingRepository.findById(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(
    body: BrowsingDTO,
  ): Promise<ReturnType<BrowsingRepository['create']>> {
    try {
      return await this.browsingRepository.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(
    id: string,
    body: BrowsingDTO,
  ): Promise<ReturnType<BrowsingRepository['update']>> {
    try {
      return await this.browsingRepository.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: string): Promise<ReturnType<BrowsingRepository['update']>> {
    try {
      return await this.browsingRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
