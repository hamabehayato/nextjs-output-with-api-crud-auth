/**
 * TodoList
 *
 * @package components
 */
import Link from 'next/link'
import { FC } from 'react'
import { DetailIcon } from '@/components/atoms/Icons/Detail'
import { EditIcon } from '@/components/atoms/Icons/Edit'
import { TrashIcon } from '@/components/atoms/Icons/Trash'
import { NAVIGATION_PATH } from '@/constants/navigations'
import { TodoType } from '@/interfaces/Todo'
import styles from './styles.module.css'

type Props = {
  showTodoList: Array<TodoType>
  deleteTodo: (id: number) => void
}

/**
 * TodoList
 * @returns {JSX.Element}
 * @constructor
 */
export const TodoList: FC<Props> = ({ showTodoList, deleteTodo }) => {
  return (
    <>
      {showTodoList.map((todo) => (
        <div className={styles.todo} key={todo.id}>
          <p>{todo.title}</p>
          <div className={styles.iconBox}>
            <Link href={`${NAVIGATION_PATH.DETAIL}${todo.id}`} className={styles.icon}>
              <DetailIcon />
            </Link>
            <Link href={`${NAVIGATION_PATH.EDIT}${todo.id}`} className={styles.icon}>
              <EditIcon />
            </Link>
            <button onClick={() => deleteTodo(todo.id)} className={styles.icon}>
              <TrashIcon />
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
