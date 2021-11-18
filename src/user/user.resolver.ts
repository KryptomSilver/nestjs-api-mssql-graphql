import { Resolver } from '@nestjs/graphql';
import { UserType } from './graphql/user.type';
import { UserService } from './user.service';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private UserService: UserService) {}
}
