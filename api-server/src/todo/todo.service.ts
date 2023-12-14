import { AppDataSource } from '../data-source';
import { Todo } from './entity/Todo';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

export class TodoService {
  async findAll(userId: number): Promise<Todo[]> {
    return await AppDataSource.manager.find(Todo, {
      where: {
        user_id: userId,
      },
    });
  }

  async findOne(id: number, userId: number) {
    return await AppDataSource.manager.findOne(Todo, {
      where: {
        id: id,
        user_id: userId,
      },
    });
  }

  async create(createTodoDto: CreateTodoDto) {
    const todoRepository = AppDataSource.getRepository(Todo);
    const newTodo = new Todo();

    newTodo.user_id = createTodoDto.userId;
    newTodo.title = createTodoDto.title;
    newTodo.content = createTodoDto.content;
    return await todoRepository.save(newTodo);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todoRepository = AppDataSource.getRepository(Todo);
    const updateTodo = await AppDataSource.manager.findOne(Todo, {
      where: {
        id: id,
      },
    });

    if (!updateTodo) {
      return null;
    }

    updateTodo.title = updateTodoDto.title;
    updateTodo.content = updateTodoDto.content;
    return await todoRepository.save(updateTodo);
  }

  async remove(id: number) {
    const todoRepository = AppDataSource.getRepository(Todo);
    const deleteTodo = await AppDataSource.manager.findOne(Todo, {
      where: {
        id: id,
      },
    });

    if (!deleteTodo) {
      return null;
    }

    return await todoRepository.delete(deleteTodo);
  }
}
