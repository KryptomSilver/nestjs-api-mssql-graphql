import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<IUser>,
  ) {}
  getUsers(): Promise<IUser[]> {
    return this.usersRepository.find();
  }
}
