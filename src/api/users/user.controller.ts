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
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDTO, UpdateDto } from './user.dto';
import { UserApplication } from './user.application';
import { JwtAuthGuard } from 'src/api/auth/jwt-auth.guard';
import { getId } from 'src/config/objectId';
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

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Req() req,
    @Param('id') id,
    @Body(new ValidationPipe()) body: UpdateDto,
  ): Promise<ReturnType<UserApplication['update']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      if (!req.user) {
        throw new BadRequestException('user is required');
      }
      if (getId(req.user) !== id) {
        throw new UnauthorizedException('user is not authorized');
      }
      return await this.userApplication.update(id, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete(':id')
  async delete(
    @Req() req,
    @Param('id') id,
  ): Promise<ReturnType<UserApplication['delete']>> {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      if (!req.user) {
        throw new BadRequestException('user is required');
      }
      if (req.user.id !== id) {
        throw new UnauthorizedException('user is not authorized');
      }
      return await this.userApplication.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
