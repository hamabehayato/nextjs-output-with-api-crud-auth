import { Request, Response } from 'express';
import { Todo } from './entity/Todo';
import { findAll, findOne, create, update, remove } from './todo.controller';
import { TodoService } from './todo.service';

// import 'reflect-metadata'; // これが重要です
import { AppDataSource } from '../data-source';
import {
  destroyConnection,
  initConnection,
  refreshDatabase,
} from '../__tests__/refreshDatabase';

beforeAll(async () => {
  await initConnection();
});

afterAll(async () => {
  await destroyConnection();
});

describe('TodoController', () => {
  let todoService: TodoService;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(async () => {
    todoService = new TodoService();
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test('ログインテスト', async () => {
    await refreshDatabase(async () => {
      req.body = { userId: 'testUserId' };

      jest
        .spyOn(todoService, 'findAll')
        .mockResolvedValue([
          { id: 1, user_id: 1, title: 'Test Todo', content: 'Test Content' },
        ] as Todo[]);

      await findAll(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: 1, title: 'Test Todo', content: 'Test Content' },
      ]);
    });
  });
});
