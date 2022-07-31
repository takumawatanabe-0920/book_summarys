import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthApplication } from './auth.application';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authApplication: AuthApplication) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authApplication.validateUser(email, password);
    console.log({ user, email, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
