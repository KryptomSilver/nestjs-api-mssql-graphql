import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field((type) => Int, { nullable: true })
  id: number;
  @Field((type) => Int, { nullable: true })
  age: number;
  @Field({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  lastName: string;
}
@ObjectType()
export class ResponseType {
  @Field(() => UserType, { nullable: true })
  user: Object;
  @Field(() => String, { nullable: true })
  msg: string;
}
