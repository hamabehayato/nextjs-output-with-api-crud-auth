/**
 * User API
 *
 * @package src/user
 * @route POST /api/signup
 * @route POST /api/signin
 */
import * as express from 'express';
import { signUp, signIn } from './auth.controller';

const router = express.Router();

// ルート定義
router.post('/signup', signUp);
router.post('/signin', signIn);

export default router;
