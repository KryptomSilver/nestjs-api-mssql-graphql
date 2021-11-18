import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}
  @Get()
  getUsers() {
    const users = this.UserService.getUsers();
    return users;
  }
}
