import {
  Controller,
  Inject,
  Post,
  Body,
  ValidationPipe,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AuthApplication } from './auth.application';
import { LocalAuthGuard } from './local-auth.guard';
import { UserDTO } from 'src/api/users/user.dto';
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthApplication)
    private readonly authApplication: AuthApplication,
  ) {}

  @Post('signup')
  async signup(@Body(new ValidationPipe()) body: UserDTO) {
    try {
      const { email, password } = body;
      if (!email || !password) {
        throw new BadRequestException('email and password are required');
      }
      return await this.authApplication.signup(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body(new ValidationPipe()) body: UserDTO) {
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
