import * as bcrypt from 'bcryptjs';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TokenPayload } from './interfaces/token.interface';
import {
  access_token_private_key,
  refresh_token_private_key,
} from '@constants/jwt.constraints';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/services/prisma.extension';
import { omit } from 'lodash';
import { Prisma } from '@prisma/client';
import { RequestWithUser } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async findUser(condition: Prisma.UserWhereInput) {
    return this.prismaService.client.user.findFirst({
      where: condition,
    });
  }

  async signIn(user: RequestWithUser['user']) {
    const access_token = this.generateAccessToken({
      userId: user.id,
    });
    const refresh_token = this.generateRefreshToken({
      userId: user.id,
    });
    const decodedToken = this.jwtService.decode(access_token) as {
      [key: string]: any;
    };
    const iat = decodedToken?.iat;
    const exp = decodedToken?.exp;
    return {
      iat,
      exp,
      type: 'Bearer',
      user_id: user.id,
      access_token,
      refresh_token,
    };
  }

  async getAuthenticatedUser(email: string, password: string) {
    const user = await this.findUser({
      email,
    });

    if (!user) {
      throw new BadRequestException('Your username or password is incorrect.');
    }

    const is_matching = await bcrypt.compare(password, user.password);
    if (!is_matching) {
      throw new BadRequestException('Your username or password is incorrect.');
    }

    return user;
  }

  generateAccessToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      algorithm: 'RS256',
      privateKey: access_token_private_key,
      expiresIn: `${this.configService.get<string>('jwt.refreshIn')}`,
    });
  }

  generateRefreshToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      algorithm: 'RS256',
      privateKey: refresh_token_private_key,
      expiresIn: `${this.configService.get<string>('jwt.refreshIn')}`,
    });
  }

  async getUserInfo(user: RequestWithUser['user']) {
    return omit(user, ['password']);
  }
}
