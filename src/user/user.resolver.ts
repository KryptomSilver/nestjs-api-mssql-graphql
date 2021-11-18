import { Resolver, Query, Args, Int } from '@nestjs/graphql';
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
  @Query(() => UserType, { nullable: true })
  async getUser(@Args('idUser', { type: () => Int }) idUser: number) {
    const user = this.UserService.getUser(idUser);
    return user;
  }
}
