import { IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  displayName: string;

  @IsString()
  photoURL: string;

  @IsString()
  login_id: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
