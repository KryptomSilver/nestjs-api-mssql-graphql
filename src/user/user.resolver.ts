import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { UserInput } from './graphql/user.input';
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
  @Mutation(() => UserType)
  async createUser(@Args('user') userDTO: UserInput) {
    const idUser = await this.UserService.createUser(userDTO);
    const user = await this.UserService.getUser(idUser);
    return user;
  }
}
