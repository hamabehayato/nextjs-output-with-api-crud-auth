import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';

// AuthServiceのインスタンスを1度だけ生成
const authService = new AuthService();

/**
 * ログイン
 *
 * @route POST /api/signin
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

/**
 * 会員登録
 *
 * @route POST /api/signin
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

/**
 * 認証チェック
 *
 * @route POST /api/authentication
 */
export const authentication = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        errorCode: 401,
        errorMessage: '認証が必要です。',
      });
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      userId: number;
    };
    const resUser = await authService.authCheck(decoded.userId);

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
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
