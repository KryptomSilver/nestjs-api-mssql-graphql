import { Resolver, Query } from '@nestjs/graphql';
import { UserType } from './graphql/user.type';
import { UserService } from './user.service';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private UserService: UserService) {}
  @Query(() => [UserType])
  async getUsers() {
    const users = await this.UserService.getUsers();
    return users;
  }
}
