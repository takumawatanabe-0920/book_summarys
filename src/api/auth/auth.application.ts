import { Injectable } from '@nestjs/common';
import { UserApplication } from 'src/api/users/user.application';
@Injectable()
export class AuthApplication {
  constructor(private userApplication: UserApplication) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userApplication.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
