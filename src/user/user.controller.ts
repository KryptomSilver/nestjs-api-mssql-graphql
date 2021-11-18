import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { IUser } from './interface/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}
  @Get()
  async getUsers() {
    const users = await this.UserService.getUsers();
    return users;
  }
  @Get(':userID')
  async getUser(@Param('userID') userID): Promise<IUser> {
    console.log();
    const user = await this.UserService.getUser(parseInt(userID));
    if (!user) throw new NotFoundException('Product not found');
    return user;
  }
  @Post()
  async createUser(@Body() userDTO: UserDTO): Promise<IUser> {
    const userID = await this.UserService.createUser(userDTO);
    const user = await this.getUser(userID);
    return user;
  }
  
}
