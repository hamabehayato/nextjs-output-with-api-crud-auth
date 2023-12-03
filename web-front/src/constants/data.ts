/**
 * initTodo
 *
 * @package constants
 */
import { TodoType } from '@/interfaces/Todo'

/**
 * Todoリストの初期値
 */
export const INIT_TODO_LIST: Array<TodoType> = [
  {
    id: 1,
    title: 'test1',
    content: 'test1 content',
  },
  {
    id: 2,
    title: 'test2',
    content: 'test2 content',
  },
]
