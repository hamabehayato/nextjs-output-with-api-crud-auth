/**
 * useTodoEditTemplate
 *
 * @package hooks
 */
import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { NAVIGATION_PATH } from '@/constants/navigations';
import { TodoType } from '@/interfaces/Todo';
import { EventType } from '@/interfaces/Event';

type Params = {
  // id, title, content を持つオブジェクトが引数で、返り値が void の関数である
  updateTodo: (id: number, title: string, content: string) => void;
  originTodoList: Array<TodoType>;
};

type StatesType = {
  inputTitle: string | undefined;
  inputContent: string | undefined;
};

type ActionsType = {
  handleChangeTitle: EventType['onChangeInput'];
  handleChangeContent: EventType['onChangeTextArea'];
  handleUpdateTodo: EventType['onSubmit'];
};

/**
 * useTodoEditTemplate
 * @param updateTodo
 * @returns {[{inputTitle: string, inputContent: string}
 * {handleUpdateTodo: ((function(*): void)|*)
 * handleChangeContent: (function(*): void)
 * handleChangeTitle: (function(*): void)}]}
 */
export const useTodoEditTemplate = ({ updateTodo, originTodoList }: Params) => {
  const router = useRouter();
  const id = router.query.number;

  // アロー関数において {} 無しの場合、暗黙的に retun が行われる
  const todo = useMemo(() => originTodoList.find((todo: TodoType) => String(todo.id) === id), [originTodoList, id]);

  /* local state */
  const [inputTitle, setInputTitle] = useState(todo?.title);
  const [inputContent, setInputContent] = useState(todo?.content);

  /* actions */
  /**
   * title の更新処理
   * @param {*} e
   */
  const handleChangeTitle: EventType['onChangeInput'] = useCallback((e) => {
    setInputTitle(e.target.value);
  }, []);

  /**
   * content の更新処理
   * @param {*} e
   */
  const handleChangeContent: EventType['onChangeTextArea'] = useCallback((e) => {
    setInputContent(e.target.value);
  }, []);

  /**
   * Todo の更新処理
   * @type {function(*): void |*}
   */
  const handleUpdateTodo: EventType['onSubmit'] = useCallback(
    (e) => {
      // e.preventDefault(): ブラウザデフォルトのform 送信機能を無効化
      e.preventDefault();
      // !! は二重否定演算子。存在すれば true, なければfalse に変換される
      if (!!todo?.id && inputTitle && inputContent) {
        updateTodo(todo.id, inputTitle, inputContent);
        router.push(NAVIGATION_PATH.TOP);
      }
    },
    // これらが更新された時のみ、関数を再生成する
    [updateTodo, inputTitle, inputContent]
  );

  const states: StatesType = { inputTitle, inputContent };

  const actions: ActionsType = { handleChangeTitle, handleChangeContent, handleUpdateTodo };

  return [states, actions] as const;
};
