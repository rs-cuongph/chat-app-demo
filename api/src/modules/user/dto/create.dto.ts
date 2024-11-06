import { IsMatch } from '@decorators/validator/match.decorator';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsMatch('password')
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @IsString()
  @IsOptional()
  name: string;
}
