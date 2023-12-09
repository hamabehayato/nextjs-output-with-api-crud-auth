import axios, { AxiosError } from 'axios';
import { AuthResponseType } from '@/interfaces/User';

/**
 * ResponseType
 */
// ジェネリックな型の定義
// T は引数を受け取り、引数がない場合は undefined となる。
export interface ResponseType<T = undefined> {
  code: number;
  data?: T;
  message?: String;
}

const BASE_API_URL = process.env.BASE_API_URL || 'http://localhost';

export const globalAxios = axios.create({
  baseURL: `${BASE_API_URL}/api`,
  timeout: 1000,
  // リクエストヘッダーを json 形式にすることを指定
  headers: {
    'Content-type': 'application/json',
  },
});

export interface IErrorResponse {
  code: string;
  config: any;
  message: string;
  request: any;
  response: {
    config: any;
    data: {
      error: string;
      message: string;
      statusCode: string;
    };
    headers: any;
    request: any;
    status: number;
    statusText: string;
  };
}

export const isAxiosError = (error: any): error is AxiosError => !!error.isAxiosError;

export default globalAxios;
