/**
 * TodoDetailTemplate
 *
 * @package components
 */
import { useRouter } from 'next/router'
import { useTodoContext } from '@/contexts/TodoContext'
import { BaseLayout } from '@/components/organisms/BaseLayout'
import { InputForm } from '@/components/atoms/InputForm'
import { TextArea } from '@/components/atoms/TextArea'
import { TodoType } from '@/interfaces/Todo'

export const TodoDetailTemplate = () => {
  const router = useRouter()

  const { originTodoList } = useTodoContext()
  const id = router.query.number
  // アロー関数において {} 無しの場合、暗黙的に retun が行われる
  const todo = originTodoList.find((todo: TodoType) => String(todo.id) === id)

  /**
   * TodoDetailTemplate
   * @returns {JSX.Element}
   * @constructor
   */
  return (
    <BaseLayout title={'Todo Detail'}>
      <InputForm disabled value={todo?.title} placeholder={'Title'} />
      <TextArea disabled value={todo?.content} placeholder={'Content'} />
    </BaseLayout>
  )
}
