/**
 * TodoTemplate
 *
 * @package components
 */
import { useTodoContext } from '@/contexts/TodoContext';
import { BaseLayout } from '@/components/organisms/BaseLayout';
import { InputForm } from '@/components/atoms/InputForm';
import { TextArea } from '@/components/atoms/TextArea';
import { CommonButton } from '@/components/atoms/CommonButton';
import { useTodoCreateTemplate } from './useTodoCreateTemplate';

export const TodoCreateTemplate = () => {
  const { createTodo } = useTodoContext();
  const [{ inputTitle, inputContent }, { handleChangeTitle, handleChangeContent, handleCreateTodo }] =
    useTodoCreateTemplate({ createTodo });

  /**
   * TodoTemplate
   * @returns {JSX.Element}
   * @constructor
   */
  return (
    <BaseLayout title={'Create Todo'}>
      <form onSubmit={handleCreateTodo}>
        <InputForm value={inputTitle} placeholder={'Title'} onChange={handleChangeTitle} />

        <TextArea value={inputContent} placeholder={'Content'} onChange={handleChangeContent} />

        <CommonButton title={'Create Todo'} type={'submit'} />
      </form>
    </BaseLayout>
  );
};
