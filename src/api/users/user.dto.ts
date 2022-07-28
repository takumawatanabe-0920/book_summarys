import { IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  displayName: string;

  @IsString()
  photoURL: string;

  @IsString()
  token: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
