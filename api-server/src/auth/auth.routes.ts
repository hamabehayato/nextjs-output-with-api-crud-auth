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
import { authGuard } from '../lib/guards/jwt-auth.guard';

const router = Router();

// ルート定義
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/authentication', authGuard, authentication);

export default router;
