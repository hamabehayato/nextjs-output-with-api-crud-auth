/**
 * useTodoListTemplate
 *
 * @package hooks
 */
import { useState, useMemo, useCallback } from 'react';
import { TodoType } from '@/interfaces/Todo';
import { EventType } from '@/interfaces/Event';

type Params = {
  originTodoList: Array<TodoType>;
  deleteTodo: (targetId: number) => void;
};

type StatesType = {
  inputSearch: string;
  showTodoList: Array<TodoType>;
};

type ActionsType = {
  handleChangeSearch: EventType['onChangeInput'];
  handleDeleteTodo: (targetId: number, targetTitle: string) => void;
};

/**
 * useTodoListTemplate
 * @param createTodo
 * @returns {[{inputTitle: string, inputContent: string}
 * {handleCreateTodo: ((function(*): void)|*)
 * handleChangeContent: (function(*): void)
 * handleChangeTitle: (function(*): void)}]}
 */
export const useTodoListTemplate = ({ originTodoList, deleteTodo }: Params) => {
  /* local state */
  const [inputSearch, setInputSearch] = useState('');

  /* actions */
  // useMemo は、値に変更がある時発火し、画面描写に変更がない場合はキャッシュを使う(処理軽減)
  const showTodoList = useMemo(() => {
    // 正規表現で前方一致を確認する
    const regexp = new RegExp('^' + inputSearch, 'i');
    return originTodoList.filter((todo) => {
      return todo.title.match(regexp);
    });
    // 以下の要素に変更があった時のみ、関数を再生成する
  }, [originTodoList, inputSearch]);

  /**
   * search の更新処理
   * @param {*} e
   */
  const handleChangeSearch: EventType['onChangeInput'] = useCallback((e) => {
    setInputSearch(e.target.value);
  }, []);

  /**
   * Todo 削除時の処理
   * @param {number} targetId
   * @param {string} targetTitle
   */
  const handleDeleteTodo = useCallback(
    (targetId: number, targetTitle: string) => {
      if (window.confirm(`「${targetTitle}」のtodoを削除しますか？`)) {
        deleteTodo(targetId);
      }
    },
    [deleteTodo]
  );

  const states: StatesType = {
    inputSearch,
    showTodoList,
  };
  const actions: ActionsType = {
    handleChangeSearch,
    handleDeleteTodo,
  };

  return [states, actions] as const;
};
