import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Todo } from './entity/Todo';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

/**
 * Get all todos
 *
 * @route GET /api/todos
 */
export const getTodos = async (_req: Request, res: Response) => {
  try {
    // データベースからすべてのtodoを取得
    const allTodos = await AppDataSource.manager.find(Todo);

    // 取得したtodoをJSONレスポンスとしてクライアントに送信
    res.status(200).json(allTodos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error' });
  }
};

/**
 * Get find todo
 *
 * @route GET /api/todo/:id
 */
export const findTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);

  try {
    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = await todoRepository.findOneBy({ id: parseInt(id, 10) });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/**
 * Create New todo
 *
 * @route POST /api/todo
 */
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body as CreateTodoDto;

    const newTodo = new Todo();
    newTodo.title = title;
    newTodo.content = content;

    const todoRepository = AppDataSource.getRepository(Todo);
    await todoRepository.save(newTodo);

    res.status(200).json('Create Todo');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error' });
  }
};

/**
 * Update a todo by ID
 *
 * @route PUT /api/todo/:id
 */
export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body as UpdateTodoDto;

  try {
    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = await todoRepository.findOneBy({ id: parseInt(id, 10) });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // 更新するフィールドを設定
    todo.title = title || todo.title;
    todo.content = content || todo.content;

    // データベースに保存
    await todoRepository.save(todo);

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/**
 * Delete a todo by ID
 *
 * @route DELETE /api/todo/:id
 */
export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const todoRepository = AppDataSource.getRepository(Todo);
    const deleteTodo = await todoRepository.findOneBy({ id: parseInt(id, 10) });

    if (!deleteTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    await todoRepository.delete(deleteTodo);

    res.status(200).json(`Delete: id ${deleteTodo.id}`);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
