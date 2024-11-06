import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { SignInDTO } from '../dto/sign-in.dto';
import { plainToClass } from 'class-transformer';
import { validate as classValidate } from 'class-validator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(req: Request) {
    const body = plainToClass(SignInDTO, req.body);
    console.log(body);
    const errors = await classValidate(body);
    if (errors.length) {
      throw new BadRequestException('Your username or password is incorrect.');
    } else {
      const { email, password } = req.body;
      const user = await this.authService.getAuthenticatedUser(email, password);

      return user;
    }
  }
}
