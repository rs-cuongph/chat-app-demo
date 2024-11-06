import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create.dto';
import { ExtendedPrismaClient } from 'src/services/prisma.extension';
import { CustomPrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcryptjs';
import { SALT_ROUND } from '@constants/app.constant';
import { pick } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  async createNewUser(body: CreateUserDTO) {
    let password_hash: string | undefined = undefined;
    if (body.password) {
      password_hash = await bcrypt.hash(body.password, SALT_ROUND);
    }
    return this.prismaService.client.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: password_hash,
          role: 'MEMBER',
        },
      });

      return pick(user, ['id']);
    });
  }
}
