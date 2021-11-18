import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { UserInput } from './graphql/user.input';
import { ResponseType, UserType } from './graphql/user.type';
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
  @Mutation(() => String, { nullable: true })
  async deleteUser(@Args('idUser', { type: () => Int }) idUser: number) {
    const user = await this.UserService.getUser(idUser);
    if (!user) return 'User not found';
    this.UserService.deleteUser(idUser);
    return 'User delete';
  }
  @Mutation(() => ResponseType)
  async updateUser(
    @Args('user') userDTO: UserInput,
    @Args('idUser', { type: () => Int }) idUser: number,
  ): Promise<ResponseType> {
    const user = await this.UserService.getUser(idUser);
    if (!user) return { msg: 'User not found', user: null };
    await this.UserService.updateUser(idUser, userDTO);
    const updateUser = await this.UserService.getUser(idUser);
    return { msg: 'Updated user', user: updateUser };
  }
}
