import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/services/prisma.extension';
import { CreateGroupDTO } from './dto/create.dto';
import { User } from '@prisma/client';

@Injectable()
export class GroupService {
  constructor(
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  async createNewGroup(body: CreateGroupDTO, user: ) {
    const { name, member_ids } = body;
    const members: User[] = [];
    for (const id of member_ids) {
      const user = await this.prismaService.client.user.findFirst({
        where: {
          id,
        },
      });

      members.push(user);
    }

    // return this.prismaService.client.group.create({
    //   data: {
    //     name,
    //     createdById: 
    //   },
    // });
  }
}
