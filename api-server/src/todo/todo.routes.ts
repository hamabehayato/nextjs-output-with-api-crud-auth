/**
 * Todo API
 *
 * @package src/todo
 * @route GET /api/todos
 */
import * as express from 'express';
import { findAll, findOne, create, update, remove } from './todo.controller';

const router = express.Router();

// ルートを定義する
router.get('/todos', findAll);
router.get('/todo/:id', findOne);
router.post('/todo', create);
router.put('/todo/:id', update);
router.delete('/todo/:id', remove);

export default router;
