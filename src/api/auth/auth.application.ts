import { Injectable } from '@nestjs/common';
import { UserApplication } from 'src/api/users/user.application';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { getId } from 'src/config/objectId';
import { UserDTO } from 'src/api/users/user.dto';
@Injectable()
export class AuthApplication {
  constructor(
    private userApplication: UserApplication,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<UserDTO, 'password'>> {
    const user = await this.userApplication.getOne({
      email,
    });
    const isMatch = await bcrypt.compare(password, user?.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: getId(user) };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
