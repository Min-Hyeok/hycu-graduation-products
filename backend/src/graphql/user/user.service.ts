import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserInput } from '@graphql/user/dto/login-user.input';
import { AuthService } from '@auth/auth.service';

const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  findUserAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async signUp(createUserInput: CreateUserInput): Promise<boolean> {
    const isRegisterUser = await this.findUser(createUserInput.userId);

    if (isRegisterUser) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: '중복된 아이디 입니다.',
      });
    }

    const encryptedPassword = await bcrypt.hash(
      createUserInput.password,
      saltRounds,
    );

    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          ...createUserInput,
          password: encryptedPassword,
          registerDate: new Date(),
          loginDate: new Date(),
        },
      ])
      .execute();

    return true;
  }

  async signIn(loginUserInput: LoginUserInput): Promise<JwtToken> {
    const userData = await this.findUser(loginUserInput.userId);

    if (!userData) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: '회원 정보를 찾을 수 없습니다.',
      });
    }

    const isMatchedPassword = await bcrypt.compare(
      loginUserInput.password,
      userData.password,
    );

    if (!isMatchedPassword) {
      throw new BadRequestException({
        message:
          '잘못된 비밀번호입니다. 다시 시도하거나 비밀번호 찾기를 클릭하여 재설정하세요.',
      });
    }

    const { access_token, refresh_token }: JwtToken =
      await this.authService.getTokens(userData);
    console.log('refresh_token', refresh_token);
    return {
      access_token,
    };
  }

  async findUser(userId: string): Promise<User> {
    return await this.userRepository.findOneBy({
      userId,
    });
  }
}
