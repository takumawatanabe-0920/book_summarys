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
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthApplication } from './auth.application';
import { LocalAuthGuard } from './local-auth.guard';
import { UserApplication } from 'src/api/users/user.application';
import { UserDTO } from 'src/api/users/user.dto';
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthApplication)
    private readonly authApplication: AuthApplication,
    @Inject(UserApplication)
    private readonly userApplication: UserApplication,
  ) {}

  @Post('auth/singup')
  async singup(@Body(new ValidationPipe()) body: UserDTO) {
    try {
      const { email, password } = body;
      if (!email || !password) {
        throw new BadRequestException('email and password are required');
      }
      await this.authApplication.signup(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const { access_token } = await this.authApplication.generateAccessToken(
      req.user,
    );
    await this.userApplication.update(req.user.id, {
      token: access_token,
    } as UserDTO);
  }
}
