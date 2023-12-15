/**
 * useTodo
 *
 * @package hooks
 */
// useCallback, useMemo はどちらもキャッシュを利用し、不要な関数の生成を防ぐ
// useCallback は 親コンポーネントから子コンポーネントに渡すコールバック関数をメモ化するのに使う。
// https://zenn.dev/tsucchiiinoko/articles/8da862593a9980
import { useState, useCallback, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { fetchTodoListApi, createTodoApi, updateTodoApi, deleteTodoApi } from '@/apis/todoApi';
import { TodoType } from '@/interfaces/Todo';

/**
 * useTodo
 */
export const useTodo = () => {
  const { isAuth } = useAuthContext();
  /* todoList */
  const [originTodoList, setOriginTodoList] = useState<Array<TodoType>>([]);

  /* actions */

  /**
   * Todoリスト 取得処理
   */
  // useCallback でメモ化。不要な再取得を避ける
  const fetchTodoList = useCallback(async (): Promise<void> => {
    const data = await fetchTodoListApi();
    setOriginTodoList(typeof data === 'object' ? data : []);
  }, []);

  /**
   * Todo 新規登録処理
   * @param {string} title
   * @param {string} content
   */
  const createTodo = useCallback(
    async (title: string, content: string) => {
      const todo = await createTodoApi(title, content);
      // res.data が object 型でなければ、処理をキャンセル
      if (typeof todo !== 'object') return;
      setOriginTodoList([
        ...originTodoList,
        {
          id: todo.id,
          title: todo.title,
          content: todo.content,
        },
      ]);
    },
    [originTodoList]
  );

  /**
   * Todo 更新処理
   * @param {number} id
   * @param {string} title
   * @param {string} content
   */
  const updateTodo = useCallback(
    async (id: number, title: string, content: string) => {
      const responseTodo = await updateTodoApi(id, title, content);
      if (typeof responseTodo !== 'object') return;
      const updateTodoList = originTodoList.map((todo) => {
        if (responseTodo.id === todo.id) {
          return {
            id: responseTodo.id,
            title: responseTodo.title,
            content: responseTodo.content,
          };
        }

        return todo;
      });
      setOriginTodoList(updateTodoList);
    },
    [originTodoList]
  );

  /**
   * Todo削除処理
   * @param {number} targetId
   */
  const deleteTodo = useCallback(
    async (targetId: number) => {
      const res = await deleteTodoApi(targetId);

      if (!res.data || typeof res.data !== 'object') return;

      setOriginTodoList(originTodoList.filter((todo) => todo.id !== res?.data?.id));
      fetchTodoList();
    },
    [originTodoList]
  );

  // useEffect はコンポーネントがレンダリング後・再レンダリング後に非同期な処理を行う
  // または、fetchTodoList に変更があった際に実行される(第２引数に依存する)
  useEffect(() => {
    if (isAuth) fetchTodoList();
  }, [fetchTodoList, isAuth]);

  return {
    createTodo,
    originTodoList,
    updateTodo,
    deleteTodo,
  };
};
