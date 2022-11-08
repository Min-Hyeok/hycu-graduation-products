import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from '@graphql/user/dto/create-user.input';
import { LoginUserInput } from '@graphql/user/dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '@auth/access-token.guard';
import { ExpressContext } from 'apollo-server-express';
import { AuthService } from '@auth/auth.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Query(() => [User], { name: 'findUserAll' })
  findUserAll() {
    return this.userService.findUserAll();
  }

  @Mutation(() => User)
  async signUp(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<boolean> {
    return await this.userService.signUp(createUserInput);
  }

  @Mutation(() => User)
  async signIn(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context: ExpressContext,
  ): Promise<JwtToken> {
    const { access_token, SSID } = await this.userService.signIn(
      loginUserInput,
    );

    context.res.cookie('SSID', SSID, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      access_token: access_token,
    };
  }

  @Query(() => [User], { name: 'getToken' })
  async getToken(@Context() context: ExpressContext): Promise<JwtToken> {
    const test = await this.authService.hasRefreshToken(
      context.req.cookies?.SSID,
    );
    console.log(test);
    return {
      access_token: '',
    };
  }
}
