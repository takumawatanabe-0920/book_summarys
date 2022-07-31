import {
  Controller,
  Inject,
  Post,
  Body,
  ValidationPipe,
  BadRequestException,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthApplication } from './auth.application';
import { LocalAuthGuard } from './local-auth.guard';
import { UserDTO, CreateUserDTO, LoginDTO } from 'src/api/users/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthApplication)
    private readonly authApplication: AuthApplication,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('@me')
  async me(@Request() req): Promise<UserDTO> {
    try {
      const { user } = req;
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post('signup')
  async signup(@Body(new ValidationPipe()) body: CreateUserDTO) {
    try {
      const { email, password, displayName } = body;
      if (!email || !password || !displayName) {
        throw new BadRequestException(
          'displayName, email and password are required',
        );
      }
      return await this.authApplication.signup(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body(new ValidationPipe()) body: LoginDTO) {
    try {
      const { email } = body;
      if (!email) {
        throw new BadRequestException('email are required');
      }
      return await this.authApplication.login({ email });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
