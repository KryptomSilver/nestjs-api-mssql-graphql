import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { User } from './entity/user.entity';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<IUser>,
  ) {}
  async getUsers(): Promise<IUser[]> {
    return await this.usersRepository.find();
  }
  async getUser(id: number): Promise<IUser> {
    return await this.usersRepository.findOne(id);
  }
  async createUser(userDTO: UserDTO): Promise<number> {
    const result = await this.usersRepository.insert(userDTO);
    const { identifiers } = result;
    const userID = identifiers[0].id;
    return userID;
  }
}
