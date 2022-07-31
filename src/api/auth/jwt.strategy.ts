import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UserApplication } from 'src/api/users/user.application';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userApplication: UserApplication) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const { email } = payload;
    const user = await this.userApplication.getOne({
      email,
    });
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }
}
