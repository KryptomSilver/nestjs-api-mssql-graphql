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
    const result = await this.usersRepository.insert({
      firstName: userDTO.firstName,
      lastName: userDTO.lastName,
      age: userDTO.age,
    });
    const { identifiers } = result;
    const userID = identifiers[0].id;
    return userID;
  }
  async deleteUser(id: number): Promise<Object> {
    const result = await this.usersRepository.delete(id);
    return result;
  }
  async updateUser(id: number, userDTO: UserDTO): Promise<Object> {
    const result = await this.usersRepository.update(id, {
      firstName: userDTO.firstName,
      lastName: userDTO.lastName,
      age: userDTO.age,
    });
    return result;
  }
}
