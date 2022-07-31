import { Injectable } from '@nestjs/common';
import { UserApplication } from 'src/api/users/user.application';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { getId } from 'src/config/objectId';
import { UserDTO, CreateUserDTO } from 'src/api/users/user.dto';
@Injectable()
export class AuthApplication {
  constructor(
    private userApplication: UserApplication,
    private jwtService: JwtService,
  ) {}

  async signup(body: CreateUserDTO) {
    const { email, password } = body;
    const user = await this.userApplication.getOne({ email });
    if (user) {
      throw new Error('user already exists');
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await this.userApplication.create({
      ...body,
      password: hash,
    });
    const { access_token } = await this.generateAccessToken(newUser);
    return await this.userApplication.update(getId(newUser), {
      token: access_token,
    } as UserDTO);
  }

  async login(body: Pick<UserDTO, 'email'>) {
    const { email } = body;
    const user = await this.userApplication.getOne({ email });
    if (!user) {
      throw new Error('user not found');
    }
    const { access_token } = await this.generateAccessToken(user);
    return await this.userApplication.update(getId(user), {
      token: access_token,
    } as UserDTO);
  }

  async logout(user: Pick<UserDTO, 'email'>) {
    return await this.userApplication.update(getId(user), {
      token: '',
    } as UserDTO);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<UserDTO, 'password'>> {
    const user = await this.userApplication.getOne({
      email,
    });
    const isMatch = await bcrypt.compare(password, user?.password);
    if (user && isMatch) {
      delete user.password;
      return user;
    }
    return null;
  }

  private generateAccessToken(user: Pick<UserDTO, 'email'>) {
    const payload = { email: user.email, sub: getId(user) };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
