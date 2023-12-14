/**
 * Todo API
 *
 * @package src/todo
 * @route GET /api/todos
 * @route GET /api/todo/:id
 * @route POST /api/todo
 * @route PUT /api/todo/:id
 * @route DELETE /api/todo/:id
 */
import * as express from 'express';
import { findAll, findOne, create, update, remove } from './todo.controller';
import { authGuard } from '../auth/auth.guard';

const router = express.Router();

// ルートを定義する
router.get('/todos', authGuard, findAll);
router.get('/todo/:id', authGuard, findOne);
router.post('/todo', authGuard, create);
router.put('/todo/:id', authGuard, update);
router.delete('/todo/:id', authGuard, remove);

export default router;
