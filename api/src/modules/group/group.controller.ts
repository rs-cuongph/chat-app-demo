/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Req } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDTO } from './dto/create.dto';
import { RequestWithUser } from 'src/types';

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}
  @Post('/')
  create(@Body() body: CreateGroupDTO, @Req() req: RequestWithUser) {
    return this.groupService.createNewGroup(body, req.user);
  }
}
