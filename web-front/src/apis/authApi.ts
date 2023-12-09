import { AxiosResponse } from 'axios';
import globalAxios, { isAxiosError, ResponseType, IErrorResponse } from '@/apis/config';
import { AuthResponseType } from '@/interfaces/User';

/**
 * ログインのAPI接続処理
 * @param email
 * @param password
 * @returns
 */
export const signInApi = async (email: string, password: string) => {
  try {
    const { data }: AxiosResponse<AuthResponseType> = await globalAxios.post('/signin', {
      email,
      password,
    });
    const res: ResponseType<AuthResponseType> = {
      code: 200,
      data,
    };
    return res;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.code;
    }
  }
};

/**
 * 会員登録のAPI接続処理
 * @param name
 * @param email
 * @param password
 * @returns
 */
export const signUpApi = async (name: string, email: string, password: string) => {
  console.log(name, email, password);
  const { data }: AxiosResponse<AuthResponseType> = await globalAxios.post('/signup', {
    name: name,
    email: email,
    password: password,
  });
  const res: ResponseType<AuthResponseType> = {
    code: 200,
    data,
  };
  return res;
};
