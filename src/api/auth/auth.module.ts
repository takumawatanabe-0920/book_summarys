import { Module } from '@nestjs/common';
import { AuthApplication } from './auth.application';
import { UserModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000000000000000000000000000s' },
    }),
  ],
  providers: [AuthApplication, LocalStrategy, JwtStrategy],
  exports: [AuthApplication],
})
export class AuthModule {}
