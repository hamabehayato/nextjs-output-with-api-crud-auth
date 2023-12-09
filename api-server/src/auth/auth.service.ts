import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { AppDataSource } from '../data-source';
import { User } from './entity/User';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { ResponseUserType } from '../interfaces/User';

export class AuthService {
  /**
   * ログイン
   *
   * @route POST /api/signin
   */
  signIn = async (SignInUserDto: SignInUserDto) => {
    const user = await AppDataSource.manager.findOne(User, {
      where: {
        email: SignInUserDto.email,
      },
    });

    if (!user || !bcryptjs.compare(SignInUserDto.password, user.password)) {
      return {
        errorCode: 401,
        errorMessage: 'メールアドレス または パスワードが違います。',
      };
    }

    /* アクセストークンを取得 */
    const payload = {
      userId: user.id,
      email: user.email,
    };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '72h',
      },
    );

    return {
      user: user,
      accessToken: accessToken,
    };
  };

  /**
   * 会員登録
   *
   * @route POST /api/signin
   */
  signUp = async (SignUpUserDto: SignUpUserDto) => {
    const findEmail = await AppDataSource.manager.findOne(User, {
      where: {
        email: SignUpUserDto.email,
      },
    });

    if (findEmail) {
      return {
        errorCode: 500,
        errorMessage: `${SignUpUserDto.email} は別のアカウントで使用されています。`,
      };
    }

    /* user情報を User テーブルに新規登録 */
    const createUser = new User();
    createUser.name = SignUpUserDto.name;
    createUser.email = SignUpUserDto.email;
    createUser.password = SignUpUserDto.password;
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(createUser);

    const resUser: ResponseUserType = {
      id: createUser.id,
      name: createUser.name,
      email: createUser.email,
      createdAt: createUser.createdAt,
      updatedAt: createUser.updatedAt,
    };

    const payload = {
      userId: resUser.id,
      email: resUser.email,
    };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '72h',
      },
    );

    return {
      user: resUser,
      accessToken: accessToken,
    };
  };
}
