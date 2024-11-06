import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/')
  create(@Body() body: CreateUserDTO) {
    return this.userService.createNewUser(body);
  }
}
