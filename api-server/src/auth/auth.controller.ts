import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';

// AuthServiceのインスタンスを1度だけ生成
const authService = new AuthService();

/**
 * ログイン
 *
 * @route POST /api/singin
 */
export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as SignInUserDto;

    const resUser = await authService.signIn({
      email: email,
      password: password,
    });

    if (resUser?.errorCode && resUser?.errorMessage) {
      res.status(resUser.errorCode).json({ error: resUser.errorMessage });
    }

    if (resUser?.user && resUser?.accessToken) {
      res
        .status(200)
        .json({ user: resUser.user, accessToken: resUser.accessToken });
    }

    throw new Error('Internal Server Error');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

/**
 * 会員登録
 *
 * @route POST /api/singin
 */
export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as SignUpUserDto;

    const resUser = await authService.signUp({
      name: name,
      email: email,
      password: password,
    });

    if (resUser?.errorCode && resUser?.errorMessage) {
      return res
        .status(resUser.errorCode)
        .json({ error: resUser.errorMessage });
    }

    if (resUser?.user && resUser?.accessToken) {
      return res
        .status(200)
        .json({ user: resUser.user, accessToken: resUser.accessToken });
    }

    throw new Error('Internal Server Error');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};
