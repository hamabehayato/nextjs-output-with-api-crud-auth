/**
 * User API
 *
 * @package src/user
 * @route GET /api/users
 */
import * as express from 'express';
import {
  getUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
} from './user.controller';

const router = express.Router();

// ルートを定義する
router.get('/users', getUsers);
router.get('/user/:id', findUser);
router.post('/user', createUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
