import { AxiosResponse } from 'axios';
import { globalAxios, isAxiosError } from '@/apis/config';
import { TodoType } from '@/interfaces/Todo';

/**
 * Todoリスト取得のAPI接続処理
 * @returns
 */
export const fetchTodoListApi = async () => {
  try {
    const { data }: AxiosResponse<Array<TodoType>> = await globalAxios.get('/todos');
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.code;
    }
  }
};

/**
 * Todo詳細取得のAPI接続処理
 * @param {number} id
 */
export const fetchTodoApi = async (id: number) => {
  try {
    const { data }: AxiosResponse<Array<TodoType>> = await globalAxios.get(`/todo/${id}`);
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.code;
    }
  }
};

/**
 * Todo新規登録のAPI接続処理
 * @param title
 * @param content
 * @returns
 */
export const createTodoApi = async (title: string, content: string) => {
  try {
    const { data }: AxiosResponse<TodoType> = await globalAxios.post('/todo', {
      title,
      content,
    });
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.code;
    }
  }
};

/**
 * Todo更新のAPI接続処理
 * @param {numger} id
 * @param {string} title
 * @param {string} content
 */
export const updateTodoApi = async (id: number, title: string, content: string) => {
  try {
    const { data }: AxiosResponse<TodoType> = await globalAxios.put(`/todo/${id}`, {
      title: title,
      content: content,
    });
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.code;
    }
  }
};

/**
 * Todo削除のAPI接続処理
 * @param {numger} id
 */
export const deleteTodoApi = async (id: number) => {
  try {
    const { data }: AxiosResponse<TodoType> = await globalAxios.delete(`/todo/${id}`);
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.code;
    }
  }
};
