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
  signUp = async (signUpUserDto: SignUpUserDto) => {
    const findEmail = await AppDataSource.manager.findOne(User, {
      where: {
        email: signUpUserDto.email,
      },
    });

    if (findEmail) {
      return {
        errorCode: 500,
        errorMessage: `${signUpUserDto.email} は別のアカウントで使用されています。`,
      };
    }

    const hashPassword = await bcryptjs.hash(signUpUserDto.password, 10);

    /* user情報を User テーブルに新規登録 */
    const createUser = new User();
    createUser.name = signUpUserDto.name;
    createUser.email = signUpUserDto.email;
    createUser.password = hashPassword;

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

  /**
   * 認証チェック
   *
   * @route POST /api/signin
   */
  authCheck = async (userId: number) => {
    const findUser = await AppDataSource.manager.findOne(User, {
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      return {
        errorCode: 500,
        errorMessage: '認証データが存在しません。',
      };
    }

    const resUser: ResponseUserType = {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      createdAt: findUser.createdAt,
      updatedAt: findUser.updatedAt,
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
