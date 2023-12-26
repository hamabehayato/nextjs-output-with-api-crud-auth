import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        errorCode: 401,
        errorMessage: 'ヘッダー authorization がありません',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'アクセストークンがありません' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      userId: number;
    };

    if (req?.body) {
      // リクエストオブジェクトにuserIdをセット
      req.body.userId = decoded.userId;
    }

    // 次のミドルウェアまたはルートハンドラに制御を渡す
    next();
  } catch (error) {
    res.status(500).json({ error: '認証エラー' });
  }
};
