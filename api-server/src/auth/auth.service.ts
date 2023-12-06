import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { AppDataSource } from '../data-source';
import { User } from './entity/User';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';

export class AuthService {
  /**
   * ログイン
   *
   * @route POST /api/singin
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
   * @route POST /api/singin
   */
  signUp = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body as SignUpUserDto;

      const findEmail = await AppDataSource.manager.findOne(User, {
        where: {
          email: email,
        },
      });
      if (findEmail) {
        return res
          .status(500)
          .json({ error: `${email} は別のアカウントで使用されています。` });
      }

      const newUser = new User();
      newUser.name = name;
      newUser.email = email;
      newUser.password = password;

      const userRepository = AppDataSource.getRepository(User);
      await userRepository.save(newUser);

      res.status(200).json('Create User');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'error' });
    }
  };
}
