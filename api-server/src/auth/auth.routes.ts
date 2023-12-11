/**
 * User API
 *
 * @package src/user
 * @route POST /api/signup
 * @route POST /api/signin
 * @route POST /api/authentication
 */
import { Router } from 'express';
import { signUp, signIn, authentication } from './auth.controller';

const router = Router();

// ルート定義
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/authentication', authentication);

export default router;
