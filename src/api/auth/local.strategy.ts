import { Strategy } from 'passport-local';
import { PassportStrategy, AbstractStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthApplication } from './auth.application';

const PassportJwtStrategy = PassportStrategy(Strategy) as new (
  ...args
) => AbstractStrategy & Strategy;

@Injectable()
export class LocalStrategy extends PassportJwtStrategy {
  constructor(private authApplication: AuthApplication) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authApplication.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
