import { Module } from '@nestjs/common';
import { AuthApplication } from './auth.application';
import { UserModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthApplication, LocalStrategy],
})
export class AuthModule {}
