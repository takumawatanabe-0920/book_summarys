import { IsMongoId, IsString } from 'class-validator';

export class UserDTO {
  @IsMongoId()
  _id: string;

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

export class CreateUserDTO {
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
