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
import { UserDTO, UpdateDto } from './user.dto';
import { UserApplication } from './user.application';
@Controller('users')
export class UserController {
  constructor(
    @Inject(UserApplication)
    private readonly userApplication: UserApplication,
  ) {}

  @Get()
  async list(): Promise<ReturnType<UserApplication['list']>> {
    try {
      return await this.userApplication.list();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get(':id')
  async get(
    @Param('id') id: string,
  ): Promise<ReturnType<UserApplication['get']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      const user = await this.userApplication.get(id);
      if (!user) {
        throw new NotFoundException('user not found');
      }
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) body: UserDTO,
  ): Promise<ReturnType<UserApplication['create']>> {
    try {
      return await this.userApplication.create(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body(new ValidationPipe()) body: UpdateDto,
  ): Promise<ReturnType<UserApplication['update']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      return await this.userApplication.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id,
  ): Promise<ReturnType<UserApplication['delete']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      return await this.userApplication.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
