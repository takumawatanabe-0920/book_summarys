import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthApplication } from './auth.application';
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private authApplication: AuthApplication) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { email, password } = req.body;
    try {
      const user = await this.authApplication.validateUser(email, password);
      if (!user) {
        throw new UnauthorizedException();
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}
