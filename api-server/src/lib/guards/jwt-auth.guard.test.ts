import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { authGuard } from './jwt-auth.guard';
import 'dotenv/config';

// 有効なトークンを生成
function generateValidToken(userId: number, email: string): string {
  const payload = {
    userId: userId,
    email: email,
  };

  // JWT トークンを生成
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '72h',
  });

  return accessToken;
}

describe('authGuard middleware', () => {
  it('有効なトークンの場合、正常に通過すること', () => {
    const validToken = generateValidToken(1, 'test@email.com');

    const mockRequest = {
      headers: {
        authorization: `Bearer ${validToken}`,
      },
    } as Request; // Request の型アサーション

    const mockResponse = {} as Response; // Response の型アサーション
    const mockNext: NextFunction = jest.fn();

    // jwt.verify 関数のモックが復号化されたペイロードを返すように設定
    // (jest.spyOn(jwt, 'verify') as any).mockReturnValueOnce({ userId: 1 });

    authGuard(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  it('トークンが存在しない: 401 エラー', () => {
    const mockRequest = {
      headers: {
        authorization: '',
      },
    } as Request;

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockNext: NextFunction = jest.fn();

    authGuard(mockRequest, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errorCode: 401,
      errorMessage: 'ヘッダー authorization がありません',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('無効なトークン: 401エラー', () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer invalid_token_here',
      },
    } as Request; // Request の型アサーション

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Mocking the jwt.verify function to throw an error for testing
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw new Error('Invalid token');
    });

    authGuard(mockRequest, mockResponse as Response, next);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: '認証エラー',
    });
    expect(next).not.toHaveBeenCalled();
  });

  // it('should return 500 on unexpected error', () => {
  //   const mockRequest = {
  //     headers: {
  //       authorization: 'Bearer valid_token_here',
  //     },
  //   } as Request;
  //   const mockResponse: Partial<Response> = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn(),
  //   };
  //   const next = jest.fn();

  //   // Mocking the jwt.verify function to throw an unexpected error for testing
  //   jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
  //     throw new Error('Unexpected error');
  //   });

  //   authGuard(mockRequest, mockResponse as Response, next);

  //   expect(mockResponse.status).toHaveBeenCalledWith(500);
  //   expect(mockResponse.json).toHaveBeenCalledWith({ error: 'authGuard' });
  //   expect(next).not.toHaveBeenCalled();
  // });
});
