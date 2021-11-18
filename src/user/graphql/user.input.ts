import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field({ nullable: true })
  id: number;
  @Field()
  age: number;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
}
