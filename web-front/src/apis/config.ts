import axios, { AxiosError } from 'axios';

const BASE_API_URL = process.env.BASE_API_URL || 'http://localhost';

export const globalAxios = axios.create({
  baseURL: `${BASE_API_URL}/api`,
  timeout: 1000,
  // リクエストヘッダーを json 形式にすることを指定
  headers: {
    'Content-type': 'application/json',
  },
});

export const isAxiosError = (error: any): error is AxiosError => !!error.isAxiosError;
