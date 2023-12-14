import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
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

    // リクエストオブジェクトにuserIdをセット
    req.body.userId = decoded.userId;

    // 次のミドルウェアまたはルートハンドラに制御を渡す
    next();
  } catch (error) {
    res.status(500).json({ error: 'authGuard' });
  }
};
