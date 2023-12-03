/**
 * TodoEditTemplate
 *
 * @package components
 */
import { useTodoContext } from '@/contexts/TodoContext'
import { BaseLayout } from '@/components/organisms/BaseLayout'
import { InputForm } from '@/components/atoms/InputForm'
import { TextArea } from '@/components/atoms/TextArea'
import { CommonButton } from '@/components/atoms/CommonButton'
import { useTodoEditTemplate } from './useTodoEditTemplate'

export const TodoEditTemplate = () => {
  const { updateTodo, originTodoList } = useTodoContext()
  const [
    { inputTitle, inputContent },
    { handleChangeTitle, handleChangeContent, handleUpdateTodo },
  ] = useTodoEditTemplate({
    updateTodo,
    originTodoList,
  })

  /**
   * TodoEditTemplate
   * @returns {JSX.Element}
   * @constructor
   */

  return (
    <BaseLayout title={'Edit Todo'}>
      <form onSubmit={handleUpdateTodo}>
        <InputForm value={inputTitle} placeholder={'Title'} onChange={handleChangeTitle} />

        <TextArea value={inputContent} placeholder={'Content'} onChange={handleChangeContent} />

        <CommonButton title={'Edit Todo'} type={'submit'} />
      </form>
    </BaseLayout>
  )
}
