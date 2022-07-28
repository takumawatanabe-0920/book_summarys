import { Injectable } from '@nestjs/common';
import { UserApplication } from 'src/api/users/user.application';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthApplication {
  constructor(
    private userApplication: UserApplication,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userApplication.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
